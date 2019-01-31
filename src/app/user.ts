import {Pigeon} from './pigeon';

export interface User {
  id: string;
  name: string;
  pigeons: Pigeon[];
}
