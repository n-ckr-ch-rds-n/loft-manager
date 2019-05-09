import {Component, Inject, ViewChild} from '@angular/core';
import {Pigeon} from '../pigeon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Apollo} from 'apollo-angular';
import {UPDATE_PIGEON_MUTATION} from '../graphql';
import {FormType} from '../form.type';
import {PigeonFormComponent} from '../pigeon-form/pigeon-form.component';

@Component({
  selector: 'app-edit-pigeon',
  templateUrl: './edit-pigeon.component.html',
  styleUrls: ['./edit-pigeon.component.scss']
})
export class EditPigeonComponent {
  FormType = FormType;

  @ViewChild('pigeonForm')
  form: PigeonFormComponent;

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
        ...this.data.selectedPigeon,
        carouselImages: [...this.data.selectedPigeon.carouselImages.map(image => ({url: image.url, caption: image.caption}))]
      }
    }).subscribe();
  }
}
