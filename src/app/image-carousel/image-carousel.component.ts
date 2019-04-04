import {Component, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {IImage} from 'ng-simple-slideshow';
import {Pigeon} from '../pigeon';
import {HTMLInputEvent} from '../html.input.event';
import {UPDATE_PIGEON_MUTATION} from '../graphql';
import {Apollo} from 'apollo-angular';
import {ImageUploadResponse} from '../add-pigeon/add-pigeon.component';
import {HttpClient} from '@angular/common/http';
import {carouselConfig} from './carousel.config';
import {CarouselOptionsComponent} from '../carousel-options/carousel-options.component';
import {Graphcool} from '../graphcool';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  iImages: (IImage)[] = [];
  imageFiles: File[] = [];
  carouselConfig = carouselConfig;
  uploadComplete: EventEmitter<void> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ImageCarouselComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
              public dialog: MatDialog,
              public apollo: Apollo,
              private http: HttpClient) {}

  @ViewChild('slideshow') slideshow: any;

  ngOnInit() {
    this.iImages = this.data.selectedPigeon.carouselImages
      ? this.data.selectedPigeon.carouselImages.map(imageUrl => this.toIImage(imageUrl)) : [];
    if (this.data.selectedPigeon.imageUrl.length > 0
      && !this.data.selectedPigeon.carouselImages.includes(this.data.selectedPigeon.imageUrl)) {
      this.iImages.unshift(this.toIImage(this.data.selectedPigeon.imageUrl));
    }
  }

  exit(): void {
    this.dialogRef.close();
  }

  toIImage(imageUrl: string): IImage {
    return {
      url: imageUrl,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      clickAction: () => { this.openOptionsDialog(); }
    };
  }

  openOptionsDialog() {
    const optionsDialog = this.dialog.open(CarouselOptionsComponent, {
      width: 'auto',
      data: { image: this.iImages[this.slideshow.slideIndex] }
    });

    optionsDialog.afterClosed().subscribe(result => {
      if (result && result.imageToDelete) {
        this.iImages = this.iImages.filter(iImage => iImage.url !== result.imageToDelete);
        this.data.selectedPigeon.carouselImages = this.data.selectedPigeon.carouselImages.filter(url => url !== result.imageToDelete);
      }
    });
  }

  addAnImage(event: HTMLInputEvent) {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      this.imageFiles.push(imageFile);
      const reader = new FileReader();
      reader.onload = () => this.iImages.push((this.toIImage(reader.result as string)));
      reader.readAsDataURL(imageFile);
    }
  }

  uploadImages(imageFiles: File[]) {
    const imageUrls: string[] = [];
    imageFiles.forEach(imageFile => {
      const uploadData = new FormData();
      uploadData.append('data', imageFile, imageFile.name, );
      this.http.post<ImageUploadResponse>(Graphcool.FileUploadEndpoint, uploadData)
        .subscribe(response => {
          imageUrls.push(response.url);
          if (imageUrls.length === imageFiles.length) {
            this.data.selectedPigeon.carouselImages = [...this.data.selectedPigeon.carouselImages, ...imageUrls]
            this.uploadComplete.emit();
          }
        });
    });
  }

  saveImages() {
    this.uploadImages(this.imageFiles);
    this.uploadComplete.subscribe(() => {
      this.apollo.mutate({
        mutation: UPDATE_PIGEON_MUTATION,
        variables: {
          ...this.data.selectedPigeon,
          carouselImages: [...this.data.selectedPigeon.carouselImages]
        }
      }).subscribe((response) => {
        console.log(response);
      });
    });
  }
}