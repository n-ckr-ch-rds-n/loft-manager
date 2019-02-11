import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import {AUTH_CONFIG} from '../auth0-variables';
import {Apollo} from 'apollo-angular';
import {AUTHENTICATE_USER_MUTATION} from '../graphql';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid'
  });

  constructor(public router: Router,
              public apollo: Apollo) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public authenticateWithGraphcool(idToken: string) {
    console.log('Inside the authenticate function. Id token: ' + idToken);
    this.apollo.mutate({
      mutation: AUTHENTICATE_USER_MUTATION,
      variables: {idToken: idToken}
    }).subscribe(response => {
      console.log(response);
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.authenticateWithGraphcool(authResult.idToken);
        this.router.navigate(['/pigeon']);
      } else if (err) {
        this.router.navigate(['/login']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    localStorage.setItem('isLoggedIn', 'true');
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

}
