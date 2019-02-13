import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import {AUTH_CONFIG} from '../auth0-variables';
import {Apollo} from 'apollo-angular';
import {AUTHENTICATE_USER_MUTATION, AuthenticateUserMutationResponse} from '../graphql';

export interface AuthenticatedUser {
  id: string;
  token: string;
}

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  private _authenticatedUser: AuthenticatedUser;

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

  get authenticatedUser(): AuthenticatedUser {
    return this._authenticatedUser;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public authenticateWithGraphcool(idToken: string) {
    this.apollo.mutate<AuthenticateUserMutationResponse>({
      mutation: AUTHENTICATE_USER_MUTATION,
      variables: {idToken: idToken}
    }).subscribe(response => {
      this._authenticatedUser = response.data.authenticateUser;
      localStorage.setItem('userToken', this._authenticatedUser.token);
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
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

}
