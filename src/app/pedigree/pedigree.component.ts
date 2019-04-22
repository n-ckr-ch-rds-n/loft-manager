import {AfterContentInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import mermaid from 'mermaid';
import {ALL_PIGEONS_QUERY, AllPigeonsQueryResponse, GET_PIGEON_BY_BAND_NO} from '../graphql';
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
    }
  };

  async ngOnInit() {
    this.pedigree.parents = await this.getParents(this.data.selectedPigeon.sire, this.data.selectedPigeon.dam);
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
      const parents: {sire: {}, dam: {}} = {};
      for (const parent of [sire, dam]) {
        this.getPigeonByBandNo(parent).subscribe(response => {
          if (response.data.allPigeons[0].bandNo === this.data.selectedPigeon.sire) {
            parents.sire = response.data.allPigeons[0];
          }
          if (response.data.allPigeons[0].bandNo === this.data.selectedPigeon.dam) {
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

  getPigeonByBandNo(bandNo: string): Observable {
    return this.apollo.watchQuery ({
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
      '\ngreat-grand-sire-->grand-sire' +
      '\ngreat-grand-dam-->grand-sire' +
      '\ngreat-grand-sire2-->grand-dam' +
      '\ngreat-grand-dam2-->grand-dam' +
      '\ngreat-grand-sire3-->grand-sire2' +
      '\ngreat-grand-dam3-->grand-sire2' +
      '\ngreat-grand-sire4-->grand-dam2' +
      '\ngreat-grand-dam4-->grand-dam2' +
      `\ngrand-sire-->${this.pedigree.parents.sire.name || 'sire'}` +
      `\ngrand-dam-->${this.pedigree.parents.sire.name || 'sire'}` +
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
