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

  placeHolderUrl = '../../assets/placeholder.gif';

  constructor(public dialogRef: MatDialogRef<ImageCarouselComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
              public dialog: MatDialog,
              public apollo: Apollo,
              private http: HttpClient) {}

  @ViewChild('slideshow') slideshow: any;

  ngOnInit() {
    this.iImages = this.data.selectedPigeon.carouselImages.length >= 1
      ? this.data.selectedPigeon.carouselImages.map(imageUrl => this.toIImage(imageUrl))
      : [this.toIImage(this.placeHolderUrl)];
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
        this.removeImage(result);
      }
    });
  }

  removeImage(result: any) {
    this.iImages = this.iImages.filter(iImage => iImage.url !== result.imageToDelete);
    if (this.iImages.length < 1) {
      this.iImages.push(this.toIImage(this.placeHolderUrl));
    }
    this.data.selectedPigeon.carouselImages = this.data.selectedPigeon.carouselImages.filter(url => url !== result.imageToDelete);
  }

  addAnImage(event: HTMLInputEvent) {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      this.imageFiles.push(imageFile);
      const reader = new FileReader();
      reader.onload = () => this.iImages.push((this.toIImage(reader.result as string)));
      if (this.iImages.map(iImage => iImage.url).includes(this.placeHolderUrl)) {
        this.iImages = this.iImages.filter(iImage => iImage.url !== this.placeHolderUrl);
      }
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

  updatePigeon() {
    this.apollo.mutate({
      mutation: UPDATE_PIGEON_MUTATION,
      variables: {
        ...this.data.selectedPigeon,
        carouselImages: [...this.data.selectedPigeon.carouselImages]
      }
    }).subscribe((response) => {
      console.log(response);
    });
  }

  saveImages() {
    if (this.imageFiles.length > 0) {
      this.uploadImages(this.imageFiles);
      this.uploadComplete.subscribe(() => {
        this.updatePigeon();
      });
    } else {
      this.updatePigeon();
    }
  }
}
