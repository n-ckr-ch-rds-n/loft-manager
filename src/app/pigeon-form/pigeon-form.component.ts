import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pigeon} from '../pigeon';
import {HTMLInputEvent} from '../html.input.event';

@Component({
  selector: 'app-pigeon-form',
  templateUrl: './pigeon-form.component.html',
  styleUrls: ['./pigeon-form.component.scss']
})
export class PigeonFormComponent implements OnInit {
  imageSrc: string;
  imageFile: File;

  @Input()
  pigeon: Pigeon;

  @Output()
  image: EventEmitter<File> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFileChanged(event: HTMLInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imageSrc = reader.result as string;
      reader.readAsDataURL(this.imageFile);
      this.image.emit(this.imageFile);
    }
  }

}
