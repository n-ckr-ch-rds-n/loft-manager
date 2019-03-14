import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import {defaultPigeon} from '../default.pigeon';
import {Apollo} from 'apollo-angular';
import {CREATE_PIGEON_MUTATION} from '../graphql';
import {AuthService} from '../services/auth.service';

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

  constructor(
    public dialogRef: MatDialogRef<AddPigeonComponent>,
    public apollo: Apollo,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.pigeon = defaultPigeon;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  savePigeon() {
    this.apollo.mutate({
      mutation: CREATE_PIGEON_MUTATION,
      variables: {
        ...this.pigeon,
        userId: this.auth.authenticatedUser.id
      }
    }).subscribe(() => {
      this.pigeon = defaultPigeon;
    });
  }

  onFileChanged(event: HTMLInputEvent) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imageSrc = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onUpload() {
    console.log('uploading...');
  }
}
