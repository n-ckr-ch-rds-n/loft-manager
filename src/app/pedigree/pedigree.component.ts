import {AfterContentInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import mermaid from 'mermaid';
import {GET_PIGEON_BY_BAND_NO} from '../graphql';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {defaultPigeon} from '../default.pigeon';
import {Pedigree} from '../pedigree';
import {Parents} from '../../parents';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrls: ['./pedigree.component.scss']
})
export class PedigreeComponent implements OnInit, AfterContentInit {

  constructor(public dialogRef: MatDialogRef<PedigreeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
              public dialog: MatDialog,
              private apollo: Apollo) { }

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
    await this.buildPedigreeObject();
    this.drawFlowchart();
  }

  async buildPedigreeObject() {
    this.pedigree.parents = await this.getParents(this.data.selectedPigeon.sire, this.data.selectedPigeon.dam);
    this.pedigree.paternalGrandparents = await this.getParents(this.pedigree.parents.sire.sire, this.pedigree.parents.sire.dam);
    this.pedigree.maternalGrandparents = await this.getParents(this.pedigree.parents.dam.sire, this.pedigree.parents.dam.dam);
    this.pedigree.parentsOfPaternalGrandsire =
      await this.getParents(this.pedigree.paternalGrandparents.sire.sire, this.pedigree.paternalGrandparents.sire.dam);
    this.pedigree.parentsOfPaternalGranddam =
      await this.getParents(this.pedigree.paternalGrandparents.dam.sire, this.pedigree.paternalGrandparents.dam.dam);
    this.pedigree.parentsOfMaternalGrandsire =
      await this.getParents(this.pedigree.maternalGrandparents.sire.sire, this.pedigree.maternalGrandparents.sire.dam);
    this.pedigree.parentsOfMaternalGranddam =
      await this.getParents(this.pedigree.maternalGrandparents.dam.sire, this.pedigree.maternalGrandparents.dam.dam);
  }

  getParents(sire: string, dam: string): Promise<Parents> {
    return new Promise((resolve) => {
      const parents: any = {};
      for (const parent of [sire, dam]) {
        this.getPigeonByBandNo(parent).subscribe(response => {
          if (parent === sire) {
            parents.sire = response.data.allPigeons[0] ? response.data.allPigeons[0] : this.defaultParents;
          }
          if (parent === dam) {
            parents.dam = response.data.allPigeons[0] ? response.data.allPigeons[0] : this.defaultParents;
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

  getPigeonByBandNo(bandNo: string): Observable<{data: any}> {
    return this.apollo.watchQuery({
      query: GET_PIGEON_BY_BAND_NO,
      variables: {
        userId: this.data.selectedPigeon.user.id,
        bandNo: bandNo
      }
    }).valueChanges;
  }

  drawFlowchart() {
    const element: any = this.mermaidDiv.nativeElement;
    const graphDefinition = this.buildFlowchartString();
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
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
