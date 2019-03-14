import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import {defaultPigeon} from '../default.pigeon';
import {Apollo} from 'apollo-angular';
import {CREATE_PIGEON_MUTATION} from '../graphql';
import {AuthService} from '../services/auth.service';
import {HttpClient} from '@angular/common/http';

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

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
  imageSrc: string;
  imageFile: File;
  imageUrl: string;

  constructor(
    public dialogRef: MatDialogRef<AddPigeonComponent>,
    public apollo: Apollo,
    private auth: AuthService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.pigeon = defaultPigeon;
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
    this.apollo.mutate({
      mutation: CREATE_PIGEON_MUTATION,
      variables: {
        ...this.pigeon,
        userId: this.auth.authenticatedUser.id,
        imageUrl: this.imageUrl || ''
      }
    }).subscribe((response) => {
      console.log(response);
      this.pigeon = defaultPigeon;
    });
  }

  onFileChanged(event: HTMLInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imageSrc = reader.result as string;
      reader.readAsDataURL(this.imageFile);
    }
  }

  async uploadImage(imageFile: File): Promise<void> {
    const uploadData = new FormData();
    uploadData.append('data', imageFile, imageFile.name, );
    this.http.post<ImageUploadResponse>('https://api.graph.cool/file/v1/cjrahl4l55q080115r0djemfn', uploadData)
      .subscribe(response => {
        this.imageUrl = response.url;
        this.addPigeonToDataBase();
      });
  }
}
