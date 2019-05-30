interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '50_eCAWYM0eDxZWfN3oAVKAatyl3XguG',
  domain: 'loft-manager.eu.auth0.com',
  callbackURL: `http://loft-manager.surge.sh/pigeon`
};
