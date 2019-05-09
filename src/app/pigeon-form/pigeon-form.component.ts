import {Component, Input, OnInit} from '@angular/core';
import {Pigeon} from '../pigeon';

@Component({
  selector: 'app-pigeon-form',
  templateUrl: './pigeon-form.component.html',
  styleUrls: ['./pigeon-form.component.scss']
})
export class PigeonFormComponent implements OnInit {

  @Input()
  pigeon: Pigeon;

  constructor() { }

  ngOnInit() {
  }

}
