import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddPigeonComponent} from '../add-pigeon/add-pigeon.component';
import {RemovePigeonComponent} from '../remove-pigeon/remove-pigeon.component';
import {Pigeon} from '../pigeon';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarOptions = {
    add: AddPigeonComponent,
    remove: RemovePigeonComponent
  };

  @Input()
  selectedPigeon: Pigeon;

  constructor(public dialog: MatDialog) { }

  select(eventType, selectedPigeon: Pigeon) {
    const dialogRef = this.dialog.open(this.navBarOptions[eventType], {
      width: 'auto',
      data: { selectedPigeon: this.selectedPigeon }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
  }

}
