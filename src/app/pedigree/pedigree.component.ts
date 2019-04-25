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
    },
    maternalGrandparents: {
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
    parentsOfPaternalGrandsire: {
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
    parentsOfPaternalGranddam: {
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
    parentsOfMaternalGrandsire: {
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
    parentsOfMaternalGranddam: {
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
      theme: 'dark',
      flowchart: {htmlLabels: true}
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
      `\nid8(${this.pedigree.parentsOfPaternalGrandsire.sire.name})-->id4(${this.pedigree.paternalGrandparents.sire.name})` +
      `\nid9(${this.pedigree.parentsOfPaternalGrandsire.dam.name})-->id4(${this.pedigree.paternalGrandparents.sire.name})` +
      `\nid10(${this.pedigree.parentsOfPaternalGranddam.sire.name})-->id5(${this.pedigree.paternalGrandparents.dam.name})` +
      `\nid11(${this.pedigree.parentsOfPaternalGranddam.dam.name})-->id5(${this.pedigree.paternalGrandparents.dam.name})` +
      `\nid12(${this.pedigree.parentsOfMaternalGrandsire.sire.name})-->id6(${this.pedigree.maternalGrandparents.sire.name})` +
      `\nid13(${this.pedigree.parentsOfMaternalGrandsire.dam.name})-->id6(${this.pedigree.maternalGrandparents.sire.name})` +
      `\nid14(${this.pedigree.parentsOfMaternalGranddam.sire.name})-->id7(${this.pedigree.maternalGrandparents.dam.name})` +
      `\nid15(${this.pedigree.parentsOfMaternalGranddam.dam.name})-->id7(${this.pedigree.maternalGrandparents.dam.name})` +
      `\nid4(${this.pedigree.paternalGrandparents.sire.name})-->id2(${this.pedigree.parents.sire.name})` +
      `\nid5(${this.pedigree.paternalGrandparents.dam.name})-->id2(${this.pedigree.parents.sire.name})` +
      `\nid6(${this.pedigree.maternalGrandparents.sire.name})-->id3(${this.pedigree.parents.dam.name})` +
      `\nid7(${this.pedigree.maternalGrandparents.dam.name})-->id3(${this.pedigree.parents.dam.name})` +
      `\nid2(${this.pedigree.parents.sire.name})-->id1(${this.data.selectedPigeon.name})` +
      `\nid3(${this.pedigree.parents.dam.name})-->id1(${this.data.selectedPigeon.name})`;
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
      element.innerHTML = svgCode;
    });
  }

  exit(): void {
    this.dialogRef.close();
  }

}
