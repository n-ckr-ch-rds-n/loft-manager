import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pigeon-details',
  templateUrl: './pigeon-details.component.html',
  styleUrls: ['./pigeon-details.component.scss']
})
export class PigeonDetailsComponent implements OnInit {
  pigeon: Pigeon;

  constructor() { }

  ngOnInit() {
  }

}
