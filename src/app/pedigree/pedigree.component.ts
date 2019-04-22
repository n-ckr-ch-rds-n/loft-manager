import {AfterContentInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import mermaid from 'mermaid';
import {ALL_PIGEONS_QUERY, AllPigeonsQueryResponse, GET_PIGEON_BY_BAND_NO} from '../graphql';
import {Apollo} from 'apollo-angular';

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
      }
    }
  };

  ngOnInit() {
    this.apollo.watchQuery ({
      query: GET_PIGEON_BY_BAND_NO,
      variables: {
        userId: this.data.selectedPigeon.user.id,
        bandNo: this.data.selectedPigeon.sire
      }
    }).valueChanges.subscribe(response => {
      this.pedigree.parents.sire = response.data.allPigeons[0];
      this.drawFlowchart();
    });
  }

  public ngAfterContentInit(): void {
    mermaid.initialize({
      theme: 'forest'
    });
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
      '\ngrand-sire2-->dam' +
      '\ngrand-dam2-->dam' +
      `\n${this.pedigree.parents.sire.name}-->${this.data.selectedPigeon.name}` +
      `\ndam-->${this.data.selectedPigeon.name}`;
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
      element.innerHTML = svgCode;
    });
  }

  exit(): void {
    this.dialogRef.close();
  }

}
