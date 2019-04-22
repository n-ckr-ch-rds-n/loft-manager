import {AfterContentInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import mermaid from 'mermaid';

@Component({
  selector: 'app-pedigree',
  templateUrl: './pedigree.component.html',
  styleUrls: ['./pedigree.component.scss']
})
export class PedigreeComponent implements AfterContentInit {

  constructor(public dialogRef: MatDialogRef<PedigreeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
              public dialog: MatDialog) { }

  @ViewChild('mermaid')
  public mermaidDiv;

  public ngAfterContentInit(): void {
    mermaid.initialize({
      theme: 'dark'
    });

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
      '\ngrand-sire-->sire' +
      '\ngrand-dam-->sire' +
      '\ngrand-sire2-->dam' +
      '\ngrand-dam2-->dam' +
      '\nsire-->pigeon' +
      '\ndam-->pigeon';
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
      element.innerHTML = svgCode;
    });
  }

  exit(): void {
    this.dialogRef.close();
  }

}
