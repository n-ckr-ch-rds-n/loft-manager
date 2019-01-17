import {Component, Input, OnInit} from '@angular/core';
import {Pigeon} from '../pigeon';

@Component({
  selector: 'app-pigeon-details',
  templateUrl: './pigeon-details.component.html',
  styleUrls: ['./pigeon-details.component.scss']
})
export class PigeonDetailsComponent implements OnInit {
  @Input()
  selectedPigeon: Pigeon;

  constructor() { }

  ngOnInit() {
  }

}
