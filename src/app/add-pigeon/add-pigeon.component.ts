import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Pigeon} from '../pigeon';
import {defaultPigeon} from '../default.pigeon';
import {Apollo} from 'apollo-angular';
import {CREATE_PIGEON_MUTATION, CreatePigeonMutationResponse} from '../graphql';

@Component({
  selector: 'app-add-pigeon',
  templateUrl: './add-pigeon.component.html',
  styleUrls: ['./add-pigeon.component.scss']
})
export class AddPigeonComponent {
  pigeon: Pigeon = defaultPigeon;

  constructor(
    public dialogRef: MatDialogRef<AddPigeonComponent>,
    public apollo: Apollo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  savePigeon() {
    console.log(this.pigeon);
    this.apollo.mutate({
      mutation: CREATE_PIGEON_MUTATION,
      variables: {
        ...this.pigeon
      }
    }).subscribe(response => {

    });
    this.pigeon = defaultPigeon;
  }
}
