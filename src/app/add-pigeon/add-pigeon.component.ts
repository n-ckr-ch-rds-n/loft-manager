import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-pigeon',
  templateUrl: './add-pigeon.component.html',
  styleUrls: ['./add-pigeon.component.scss']
})
export class AddPigeonComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPigeonComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
