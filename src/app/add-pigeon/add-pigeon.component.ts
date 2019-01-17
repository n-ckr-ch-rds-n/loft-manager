import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-pigeon',
  templateUrl: './add-pigeon.component.html',
  styleUrls: ['./add-pigeon.component.scss']
})
export class AddPigeonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPigeonComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
