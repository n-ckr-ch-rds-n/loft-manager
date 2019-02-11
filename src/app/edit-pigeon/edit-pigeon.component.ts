import {Component, Inject } from '@angular/core';
import {Pigeon} from '../pigeon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Apollo} from 'apollo-angular';
import {UPDATE_PIGEON_MUTATION} from '../graphql';

@Component({
  selector: 'app-edit-pigeon',
  templateUrl: './edit-pigeon.component.html',
  styleUrls: ['./edit-pigeon.component.scss']
})
export class EditPigeonComponent {

  constructor(
    public dialogRef: MatDialogRef<EditPigeonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
    public apollo: Apollo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editPigeon() {
    this.apollo.mutate({
      mutation: UPDATE_PIGEON_MUTATION,
      variables: {
        ...this.data.selectedPigeon
      }
    }).subscribe(response => {
      console.log(response);
    });
  }
}
