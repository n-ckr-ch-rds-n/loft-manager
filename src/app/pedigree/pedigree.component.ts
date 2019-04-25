import {AfterContentInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import mermaid from 'mermaid';
import {GET_PIGEON_BY_BAND_NO} from '../graphql';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';

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

  pedigree = {
    parents: {
      sire: {
        name: '',
        bandNo: '',
        sire: '',
        dam: ''
      },
      dam: {
        name: '',
        bandNo: '',
        sire: '',
        dam: ''
      }
    },
    paternalGrandparents: {
      sire: {
        name: '',
        bandNo: '',
        sire: '',
        dam: ''
      },
      dam: {
        name: '',
        bandNo: '',
        sire: '',
        dam: ''
      }
    }
  };

  async ngOnInit() {
    this.pedigree.parents = await this.getParents(this.data.selectedPigeon.sire, this.data.selectedPigeon.dam);
    this.pedigree.paternalGrandparents = await this.getParents(this.pedigree.parents.sire.sire, this.pedigree.parents.sire.dam);
    this.drawFlowchart();
  }

  getParents(sire: string, dam: string): Promise<{
    sire: {
      name: string,
      bandNo: string,
      sire: string,
      dam: string
    },
    dam: {
      name: string,
      bandNo: string,
      sire: string,
      dam: string
    }
  }> {
    return new Promise((resolve) => {
      const parents: any = {};
      for (const parent of [sire, dam]) {
        this.getPigeonByBandNo(parent).subscribe(response => {
          if (response.data.allPigeons[0].bandNo === sire) {
            parents.sire = response.data.allPigeons[0];
          }
          if (response.data.allPigeons[0].bandNo === dam) {
            parents.dam = response.data.allPigeons[0];
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
      theme: 'forest'
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
    const graphDefinition = 'graph LR' +
      `\ngreat-grand-sire-->${this.pedigree.paternalGrandparents.sire.name}` +
      `\ngreat-grand-dam-->${this.pedigree.paternalGrandparents.sire.name}` +
      `\ngreat-grand-sire2-->${this.pedigree.paternalGrandparents.dam.name}` +
      `\ngreat-grand-dam2-->${this.pedigree.paternalGrandparents.dam.name}` +
      '\ngreat-grand-sire3-->grand-sire2' +
      '\ngreat-grand-dam3-->grand-sire2' +
      '\ngreat-grand-sire4-->grand-dam2' +
      '\ngreat-grand-dam4-->grand-dam2' +
      `\n${this.pedigree.paternalGrandparents.sire.name}-->${this.pedigree.parents.sire.name || 'sire'}` +
      `\n${this.pedigree.paternalGrandparents.dam.name}-->${this.pedigree.parents.sire.name || 'sire'}` +
      `\ngrand-sire2-->${this.pedigree.parents.dam.name || 'dam'}` +
      `\ngrand-dam2-->${this.pedigree.parents.dam.name || 'dam'}` +
      `\n${this.pedigree.parents.sire.name}-->${this.data.selectedPigeon.name}` +
      `\n${this.pedigree.parents.dam.name || 'dam'}-->${this.data.selectedPigeon.name}`;
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
      element.innerHTML = svgCode;
    });
  }

  exit(): void {
    this.dialogRef.close();
  }

}
