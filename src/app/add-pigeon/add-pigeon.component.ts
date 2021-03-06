import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import {defaultPigeon} from '../default.pigeon';
import {Apollo} from 'apollo-angular';
import {CREATE_PIGEON_MUTATION, CreatePigeonMutationResponse} from '../graphql';
import {AuthService} from '../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {Graphcool} from '../graphcool';
import {PlaceholderImage} from '../placeholder.image';
import {map} from 'rxjs/operators';
import {FormType} from '../form.type';
import {PigeonFormComponent} from '../pigeon-form/pigeon-form.component';

export interface ImageUploadResponse {
  url: string;
}

@Component({
  selector: 'app-add-pigeon',
  templateUrl: './add-pigeon.component.html',
  styleUrls: ['./add-pigeon.component.scss']
})

export class AddPigeonComponent implements OnInit {
  pigeon: Pigeon;
  imageFile: File;
  imageUrl: string;
  FormType = FormType;

  @ViewChild('pigeonForm')
  form: PigeonFormComponent;

  constructor(
    public dialogRef: MatDialogRef<AddPigeonComponent>,
    public apollo: Apollo,
    private auth: AuthService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.pigeon = {...defaultPigeon};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async savePigeon(): Promise<void> {
    if (this.imageFile) {
      await this.uploadImage(this.imageFile);
    } else {
      this.addPigeonToDataBase();
    }
  }

  addPigeonToDataBase() {
    this.apollo.mutate<CreatePigeonMutationResponse>({
      mutation: CREATE_PIGEON_MUTATION,
      variables: {
        ...this.pigeon,
        userId: this.auth.authenticatedUser.id,
        imageUrl: this.imageUrl || PlaceholderImage.Url,
        carouselImages: [{url: this.imageUrl}]
      }
    }).pipe(map(response => response.data.createPigeon))
      .subscribe(pigeon => {
      console.log(`Saved ${pigeon.name} to database`);
    });
  }

  async uploadImage(imageFile: File): Promise<void> {
    const uploadData = new FormData();
    uploadData.append('data', imageFile, imageFile.name, );
    this.http.post<ImageUploadResponse>(Graphcool.FileUploadEndpoint, uploadData)
      .subscribe(response => {
        this.imageUrl = response.url;
        this.addPigeonToDataBase();
      });
  }
}
