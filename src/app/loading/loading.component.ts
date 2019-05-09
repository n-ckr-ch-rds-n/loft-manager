import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public router: Router,
              public auth: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    setTimeout(async () => {
      if (!this.auth.authenticatedUser) {
        const snackBarRef = this.snackBar.open('Unable to find user: please login', 'OK', {duration: 5000, panelClass: 'snackbar-panel'});
        await this.router.navigate(['/login']);
        snackBarRef.onAction().subscribe(() => snackBarRef.dismiss());
      }
    }, 10000);
  }

}
