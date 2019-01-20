import {Component, Inject, Input, OnInit} from '@angular/core';
import {Pigeon} from '../pigeon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-remove-pigeon',
  templateUrl: './remove-pigeon.component.html',
  styleUrls: ['./remove-pigeon.component.scss']
})
export class RemovePigeonComponent {

  constructor(
    public dialogRef: MatDialogRef<RemovePigeonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
