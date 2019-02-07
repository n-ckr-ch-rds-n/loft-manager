import {Component, Inject, Input, OnInit} from '@angular/core';
import {Pigeon} from '../pigeon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-pigeon-details',
  templateUrl: './pigeon-details.component.html',
  styleUrls: ['./pigeon-details.component.scss']
})
export class PigeonDetailsComponent implements OnInit {
  selectedPigeon: Pigeon;

  constructor(public dialogRef: MatDialogRef<PigeonDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
  ) { }

  ngOnInit() {
    console.log(this.selectedPigeon);
  }

}
