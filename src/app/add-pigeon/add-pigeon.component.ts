import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import {defaultPigeon} from '../default.pigeon';
import {Apollo} from 'apollo-angular';
import {CREATE_PIGEON_MUTATION} from '../graphql';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-add-pigeon',
  templateUrl: './add-pigeon.component.html',
  styleUrls: ['./add-pigeon.component.scss']
})

export class AddPigeonComponent implements OnInit {
  pigeon: Pigeon;

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

  onFileChanged($event: Event) {
    console.log($event);
  }

  onUpload() {
    console.log('uploading...');
  }
}
