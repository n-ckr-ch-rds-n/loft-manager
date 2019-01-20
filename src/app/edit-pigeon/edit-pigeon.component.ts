import {Component, Inject } from '@angular/core';
import {Pigeon} from '../pigeon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-pigeon',
  templateUrl: './edit-pigeon.component.html',
  styleUrls: ['./edit-pigeon.component.scss']
})
export class EditPigeonComponent {

  constructor(
    public dialogRef: MatDialogRef<EditPigeonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
