import gql from 'graphql-tag';
import {Pigeon} from './pigeon';

export const ALL_PIGEONS_QUERY = gql`
  query AllPigeonsQuery {
    allPigeons {
      active
      bandNo
      color
      comments
      dam
      id
      imageUrl
      loft
      name
      sex
      sire
      strain
      year
    }
  }
`;

export interface AllPigeonsQueryResponse {
  allPigeons: Pigeon[];
  loading: boolean;
}


export const CREATE_PIGEON_MUTATION = gql`
  mutation CreatePigeonMutation(
  $active: Boolean,
  $bandNo: String!,
  $color: String,
  $comments: String,
  $dam: String,
  $imageUrl: String,
  $loft: String,
  $name: String,
  $sex: String,
  $sire: String,
  $strain: String,
  $year: Int
  ) {
    createPigeon(
      active: $active,
      bandNo: $bandNo
      color: $color
      comments: $comments,
      dam: $dam,
      imageUrl: $imageUrl,
      loft: $loft,
      name: $name,
      sex: $sex,
      sire: $sire,
      strain: $strain,
      year: $year
    )
    {
      id
      active
      bandNo
      color
      comments
      dam
      imageUrl
      loft
      name
      sex
      sire
      strain
      year
    }
  }
`;

export interface CreatePigeonMutationResponse {
  createPigeon: Pigeon;
  loading: boolean;
}

export const DELETE_PIGEON_MUTATION = gql`
  mutation DeletePigeonMutation(
    $id: ID!
  ) {
    deletePigeon(
      id: $id
    ) {
      name
    }
  }
`;

export interface DeletePigeonMutationResponse {
  deletePigeon: string;
}
