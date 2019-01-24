import {Component, Inject, Input, OnInit} from '@angular/core';
import {Pigeon} from '../pigeon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Apollo} from 'apollo-angular';
import {DELETE_PIGEON_MUTATION} from '../graphql';

@Component({
  selector: 'app-remove-pigeon',
  templateUrl: './remove-pigeon.component.html',
  styleUrls: ['./remove-pigeon.component.scss']
})
export class RemovePigeonComponent {

  constructor(
    public dialogRef: MatDialogRef<RemovePigeonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
    public apollo: Apollo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  removePigeon() {
    this.apollo.mutate({
      mutation: DELETE_PIGEON_MUTATION,
      variables: {
        id: this.data.selectedPigeon.id
      }
    }).subscribe(response => {
      console.log(`${response.data.deletePigeon.name} removed!`);
    });
  }
}
