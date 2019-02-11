import {Pigeon} from './pigeon';

export interface User {
  id: string;
  auth0UserId: string;
  pigeons: Pigeon[];
}
