import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public router: Router,
              public auth: AuthService) { }

  ngOnInit() {
    setTimeout(async () => {
      if (!this.auth.authenticatedUser) {
        await this.router.navigate(['/login']);
      }
    }, 10000);
  }

}
