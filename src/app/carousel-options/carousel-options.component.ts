import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IImage} from 'ng-simple-slideshow';

@Component({
  selector: 'app-carousel-options',
  templateUrl: './carousel-options.component.html',
  styleUrls: ['./carousel-options.component.scss']
})
export class CarouselOptionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CarouselOptionsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {image: IImage}) { }

  ngOnInit() {
  }

}
