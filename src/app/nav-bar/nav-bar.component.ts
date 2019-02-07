import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddPigeonComponent} from '../add-pigeon/add-pigeon.component';
import {RemovePigeonComponent} from '../remove-pigeon/remove-pigeon.component';
import {Pigeon} from '../pigeon';
import {NavbarEvent} from '../navbar.event';
import {EditPigeonComponent} from '../edit-pigeon/edit-pigeon.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarOptions: Record<string, any> = {
    [NavbarEvent.add]: AddPigeonComponent,
    [NavbarEvent.remove]: RemovePigeonComponent,
    [NavbarEvent.edit]: EditPigeonComponent
  };

  @Input()
  selectedPigeon: Pigeon;

  constructor(public dialog: MatDialog,
              private auth: AuthService) { }

  select(eventType: NavbarEvent) {
    const dialogRef = this.dialog.open(this.navBarOptions[eventType], {
      width: 'auto',
      data: { selectedPigeon: this.selectedPigeon }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
