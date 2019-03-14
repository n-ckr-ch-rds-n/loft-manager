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

@Component({
  selector: 'app-add-pigeon',
  templateUrl: './add-pigeon.component.html',
  styleUrls: ['./add-pigeon.component.scss']
})

export class AddPigeonComponent implements OnInit {
  pigeon: Pigeon;
  imageSrc: string;
  imageFile: File;

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

  savePigeon() {
    if (this.imageFile) {
      this.uploadImage(this.imageFile);
    }
    // this.apollo.mutate({
    //   mutation: CREATE_PIGEON_MUTATION,
    //   variables: {
    //     ...this.pigeon,
    //     userId: this.auth.authenticatedUser.id
    //   }
    // }).subscribe(() => {
    //   this.pigeon = defaultPigeon;
    // });
  }

  onFileChanged(event: HTMLInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imageSrc = reader.result as string;
      reader.readAsDataURL(this.imageFile);
    }
  }

  uploadImage(imageFile: File) {
    const uploadData = new FormData();
    uploadData.append('data', imageFile, imageFile.name, );
    this.http.post('https://api.graph.cool/file/v1/cjrahl4l55q080115r0djemfn', uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
        console.log(event);
      });
  }
}
