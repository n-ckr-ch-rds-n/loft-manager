import {Component, Inject, Input, OnInit} from '@angular/core';
import {Pigeon} from '../pigeon';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NavEvent} from '../nav.event';
import {AddPigeonComponent} from '../add-pigeon/add-pigeon.component';
import {RemovePigeonComponent} from '../remove-pigeon/remove-pigeon.component';
import {EditPigeonComponent} from '../edit-pigeon/edit-pigeon.component';

@Component({
  selector: 'app-pigeon-details',
  templateUrl: './pigeon-details.component.html',
  styleUrls: ['./pigeon-details.component.scss']
})
export class PigeonDetailsComponent{
  navOptions: Record<string, any> = {
    [NavEvent.add]: AddPigeonComponent,
    [NavEvent.remove]: RemovePigeonComponent,
    [NavEvent.edit]: EditPigeonComponent
  };

  constructor(public dialogRef: MatDialogRef<PigeonDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedPigeon: Pigeon},
              public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  select(eventType: NavEvent) {
    const dialogRef = this.dialog.open(this.navOptions[eventType], {
      width: 'auto',
      data: { selectedPigeon: this.data.selectedPigeon }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
