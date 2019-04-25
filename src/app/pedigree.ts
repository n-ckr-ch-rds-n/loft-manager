import {Parents} from '../parents';

export interface Pedigree {
  parents: Parents;
  paternalGrandparents: Parents;
  maternalGrandparents: Parents;
  parentsOfPaternalGrandsire: Parents;
  parentsOfPaternalGranddam: Parents;
  parentsOfMaternalGrandsire: Parents;
  parentsOfMaternalGranddam: Parents;
}
