import {AfterContentInit, Compiler, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import mermaid from 'mermaid';
import {GET_PIGEON_BY_BAND_NO} from '../graphql';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {defaultPigeon} from '../default.pigeon';
import {Pedigree} from '../pedigree';
import {Parents} from '../../parents';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrls: ['./pedigree.component.scss']
})
export class PedigreeComponent implements OnInit, AfterContentInit {

  constructor(public dialogRef: MatDialogRef<PedigreeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
              public dialog: MatDialog,
              private apollo: Apollo,
              private compiler: Compiler) { }

  @ViewChild('mermaid')
  public mermaidDiv;

  defaultParents: Parents = {sire: {...defaultPigeon, name: 'Unknown'}, dam: {...defaultPigeon, name: 'Unknown'}};

  pedigree: Pedigree = {
    parents: this.defaultParents,
    paternalGrandparents: this.defaultParents,
    maternalGrandparents: this.defaultParents,
    parentsOfPaternalGrandsire: this.defaultParents,
    parentsOfPaternalGranddam: this.defaultParents,
    parentsOfMaternalGrandsire: this.defaultParents,
    parentsOfMaternalGranddam: this.defaultParents
  };

  async ngOnInit() {
    this.compiler.clearCacheFor(PedigreeComponent);
    await this.buildPedigreeObject();
    this.drawFlowchart();
  }

  async buildPedigreeObject(): Promise<void> {
    for (const parents of Object.keys(this.pedigree)) {
      const offspring: Record<keyof Pedigree, Pigeon> = {
        parents: this.data.selectedPigeon,
        paternalGrandparents: this.pedigree.parents.sire,
        maternalGrandparents: this.pedigree.parents.dam,
        parentsOfPaternalGrandsire: this.pedigree.paternalGrandparents.sire,
        parentsOfPaternalGranddam: this.pedigree.paternalGrandparents.dam,
        parentsOfMaternalGrandsire: this.pedigree.maternalGrandparents.sire,
        parentsOfMaternalGranddam: this.pedigree.maternalGrandparents.dam
      };
      this.pedigree[parents] = await this.getParents(offspring[parents].sire, offspring[parents].dam);
    }
  }

  getParents(sire: string, dam: string): Promise<Parents> {
    return new Promise((resolve) => {
      const parents: any = {};
      for (const parent of [sire, dam]) {
        this.getPigeonByBandNo(parent).subscribe(pigeons => {
          if (parent === sire) {
            parents.sire = (pigeons[0] && pigeons[0].bandNo.length > 0) ? pigeons[0] : this.defaultParents.sire;
          }
          if (parent === dam) {
            parents.dam = (pigeons[0] && pigeons[0].bandNo.length > 0) ? pigeons[0] : this.defaultParents.dam;
          }
          if (parents.sire && parents.dam) {
            resolve(parents);
          }
        });
      }
    });
  }

  public ngAfterContentInit(): void {
    mermaid.initialize({
      theme: 'dark',
    });
  }

  getPigeonByBandNo(bandNo: string): Observable<Array<Pigeon>> {
    return this.apollo.watchQuery<any>({
      query: GET_PIGEON_BY_BAND_NO,
      variables: {
        userId: this.data.selectedPigeon.user.id,
        bandNo: bandNo
      }
    }).valueChanges
      .pipe(map(response => response.data.allPigeons));
  }

  drawFlowchart() {
    const element: any = this.mermaidDiv.nativeElement;
    const graphDefinition = this.buildFlowchartString();
    mermaid.render('graphDiv', graphDefinition, (svgCode) => {
      element.innerHTML = svgCode;
    });
  }

  buildFlowchartString() {
    return 'graph LR' +
    `\nid8(Sire: ${this.pedigree.parentsOfPaternalGrandsire.sire.name})-->id4(${this.pedigree.paternalGrandparents.sire.name})` +
    `\nid9(Dam: ${this.pedigree.parentsOfPaternalGrandsire.dam.name})-->id4(${this.pedigree.paternalGrandparents.sire.name})` +
    `\nid10(Sire: ${this.pedigree.parentsOfPaternalGranddam.sire.name})-->id5(${this.pedigree.paternalGrandparents.dam.name})` +
    `\nid11(Dam: ${this.pedigree.parentsOfPaternalGranddam.dam.name})-->id5(${this.pedigree.paternalGrandparents.dam.name})` +
    `\nid12(Sire: ${this.pedigree.parentsOfMaternalGrandsire.sire.name})-->id6(${this.pedigree.maternalGrandparents.sire.name})` +
    `\nid13(Dam: ${this.pedigree.parentsOfMaternalGrandsire.dam.name})-->id6(${this.pedigree.maternalGrandparents.sire.name})` +
    `\nid14(Sire: ${this.pedigree.parentsOfMaternalGranddam.sire.name})-->id7(${this.pedigree.maternalGrandparents.dam.name})` +
    `\nid15(Dam: ${this.pedigree.parentsOfMaternalGranddam.dam.name})-->id7(${this.pedigree.maternalGrandparents.dam.name})` +
    `\nid4(Sire: ${this.pedigree.paternalGrandparents.sire.name})-->id2(${this.pedigree.parents.sire.name})` +
    `\nid5(Dam: ${this.pedigree.paternalGrandparents.dam.name})-->id2(${this.pedigree.parents.sire.name})` +
    `\nid6(Sire: ${this.pedigree.maternalGrandparents.sire.name})-->id3(${this.pedigree.parents.dam.name})` +
    `\nid7(Dam: ${this.pedigree.maternalGrandparents.dam.name})-->id3(${this.pedigree.parents.dam.name})` +
    `\nid2(Sire: ${this.pedigree.parents.sire.name})-->id1(${this.data.selectedPigeon.name})` +
    `\nid3(Dam: ${this.pedigree.parents.dam.name})-->id1(${this.data.selectedPigeon.name})`;
  }

  exit(): void {
    this.dialogRef.close();
  }

}
