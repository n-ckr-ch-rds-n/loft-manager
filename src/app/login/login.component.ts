import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
// import {AUTH_TOKEN, USER_ID} from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = false;
  email = '';
  password = '';
  name = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  confirm() {
    if (!this.login) {
      this.signUpUser();
    }
    this.router.navigate(['pigeon']);
  }

  signUpUser() {
    console.log('user signed up');
  }

  // confirm() {
  //   if (this.login) {
  //     this.apollo.mutate<SigninUserMutationResponse>({
  //       mutation: SIGNIN_USER_MUTATION,
  //       variables: {
  //         email: this.email,
  //         password: this.password,
  //         name: this.name
  //       }
  //     }).subscribe((result) => {
  //       const id = result.data.signinUser.user.id;
  //       const token = result.data.signinUser.token;
  //       this.saveUserData(id, token);
  //
  //       this.router.navigate(['/pigeon']);
  //     }, (error) => {
  //       alert(error);
  //     });
  //   } else {
  //     this.apollo.mutate<CreateUserMutationResponse>({
  //       mutation: CREATE_USER_MUTATION,
  //       variables: {
  //         name: this.name,
  //         email: this.email,
  //         password: this.password
  //       }
  //     }).subscribe((result) => {
  //       const id = result.data.signinUser.user.id;
  //       const token = result.data.signinUser.token;
  //       this.saveUserData(id, token);
  //
  //       this.router.navigate(['/pigeon']);
  //     }, (error) => {
  //       alert(error);
  //     });
  //   }
  // }

  // saveUserData(id: string, token: string): void {
  //   localStorage.setItem(USER_ID, id);
  //   localStorage.setItem(AUTH_TOKEN, token);
  //   this.authService.setUserId(id);
  // }

}
