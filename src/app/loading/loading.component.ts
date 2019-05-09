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
        this.snackBar.open('Unable to find user: please login', null, {duration: 5000});
        await this.router.navigate(['/login']);
      }
    }, 10000);
  }

}
