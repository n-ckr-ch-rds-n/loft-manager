import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-carousel-options',
  templateUrl: './carousel-options.component.html',
  styleUrls: ['./carousel-options.component.scss']
})
export class CarouselOptionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CarouselOptionsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
