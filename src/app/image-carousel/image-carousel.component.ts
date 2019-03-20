import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IImage} from 'ng-simple-slideshow';
import {Pigeon} from '../pigeon';
import {HTMLInputEvent} from '../html.input.event';
import {UPDATE_PIGEON_MUTATION} from '../graphql';
import {Apollo} from 'apollo-angular';
import {ImageUploadResponse} from '../add-pigeon/add-pigeon.component';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  imageUrls: (IImage)[] = [];
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

  imageFiles: File[] = [];

  constructor(public dialogRef: MatDialogRef<ImageCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
              public apollo: Apollo) {}

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
      this.imageFiles.push(imageFile);
      const reader = new FileReader();
      reader.onload = () => this.imageUrls.push((this.toIImage(reader.result as string)));
      reader.readAsDataURL(imageFile);
    }

  }

  uploadImages(files: File[]) {
  }

  saveImages() {
    console.log(this.imageFiles);
    // this.apollo.mutate({
    //   mutation: UPDATE_PIGEON_MUTATION,
    //   variables: {
    //   }
    // }).subscribe();
  }
}
