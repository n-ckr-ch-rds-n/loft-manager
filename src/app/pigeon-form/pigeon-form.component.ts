import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pigeon} from '../pigeon';
import {HTMLInputEvent} from '../html.input.event';
import {FormType} from '../form.type';
import {NavEvent} from '../nav.event';
import {MatDialog} from '@angular/material';
import {ImageCarouselComponent} from '../image-carousel/image-carousel.component';

@Component({
  selector: 'app-pigeon-form',
  templateUrl: './pigeon-form.component.html',
  styleUrls: ['./pigeon-form.component.scss']
})
export class PigeonFormComponent implements OnInit {
  imageSrc: string;
  imageFile: File;
  FormType = FormType;

  @Input()
  pigeon: Pigeon;

  @Input()
  formType: FormType;

  @Output()
  image: EventEmitter<File> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

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

  openImageCarousel() {
    const openCarousel = this.dialog.open(ImageCarouselComponent, {
      width: 'auto',
      height: 'auto',
      data: { selectedPigeon: this.pigeon }
    });

    openCarousel.afterClosed().subscribe(() => {
      console.log(`${this.pigeon} images updated`);
    });
  }

}
