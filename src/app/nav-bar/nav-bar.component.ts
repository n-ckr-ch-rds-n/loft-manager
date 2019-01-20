import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddPigeonComponent} from '../add-pigeon/add-pigeon.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarOptions = {
    add: AddPigeonComponent
  };

  constructor(public dialog: MatDialog) { }

  select(eventType) {
    const dialogRef = this.dialog.open(this.navBarOptions[eventType], {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
  }

}
