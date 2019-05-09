import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
              public router: Router) { }

  ngOnInit() {
    const snackBarRef = this.snackBar.open('I\'m sorry, that page doesn\'t exist', 'OK');
    snackBarRef.onAction().subscribe(async () => await this.router.navigate(['/login']))
  }

}
