import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IImage} from 'ng-simple-slideshow';
import {Pigeon} from '../pigeon';
import {HTMLInputEvent} from '../html.input.event';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  imageUrls: (string | IImage)[] = [
    // { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg',
    //   caption: 'The first slide', href: '#config' },
    // { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg',
    //   clickAction: () => alert('custom click function') },
    // { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg',
    //   caption: 'Apple TV', href: 'https://www.apple.com/' },
    // 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg',
    // { url: 'assets/kitties.jpg', backgroundSize: 'contain', backgroundPosition: 'center' }
  ];
  height = '400px';
  minHeight: string;
  arrowSize = '30px';
  showArrows = true;
  disableSwiping = false;
  autoPlay = true;
  autoPlayInterval = 3333;
  stopAutoPlayOnSlide = true;
  debug = false;
  backgroundSize = 'cover';
  backgroundPosition = 'center center';
  backgroundRepeat = 'no-repeat';
  showDots = true;
  dotColor = '#FFF';
  showCaptions = true;
  captionColor = '#FFF';
  captionBackground = 'rgba(0, 0, 0, .35)';
  lazyLoad = false;
  hideOnNoSlides = false;
  width = '800px';
  fullscreen = false;

  imageSrc: string;

  constructor(public dialogRef: MatDialogRef<ImageCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
  ) {}

  ngOnInit() {
    this.imageUrls.unshift(this.toIImage(this.data.selectedPigeon.imageUrl));
  }

  cancel(): void {
    this.dialogRef.close();
  }

  toIImage(imageUrl: string): IImage {
    return {
      url: imageUrl,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      clickAction: this.openOptionsDialog
    };
  }

  openOptionsDialog() {
    console.log('Opened options dialog');
  }

  addAnImage(event: HTMLInputEvent) {
    console.log('Adding image...');
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imageUrls.push((this.toIImage(reader.result as string)));
      reader.readAsDataURL(imageFile);
    }

  }

}
