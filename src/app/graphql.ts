import gql from 'graphql-tag';
import {Pigeon} from './pigeon';
import {User} from './user';

export const ALL_PIGEONS_QUERY = gql`
  query AllPigeonsQuery($userId: ID) {
    allPigeons(filter: {user: {id: $userId}}) {
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
      carouselImages
    }
  }
`;

export interface AllPigeonsQueryResponse {
  allPigeons: Pigeon[];
  loading: boolean;
}

export const NEW_PIGEON_SUBSCRIPTION = gql`
  subscription {
    Pigeon(filter: {
      mutation_in: [CREATED, UPDATED, DELETED]
    }) {
      mutation
      node {
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
        carouselImages
      }
    }
  }
`;

export interface NewPigeonSubscriptionResponse {
  node: Pigeon;
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
  $year: Int,
  $userId: ID
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
      year: $year,
      userId: $userId
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

export const UPDATE_PIGEON_MUTATION = gql`
  mutation UpdatePigeonMutation(
  $id: ID!
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
  $carouselImages: [String!]
  ) {
    updatePigeon(
      id: $id,
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
      year: $year,
      carouselImages: $carouselImages
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
      carouselImages
    }
  }
`;

export interface UpdatePigeonMutationResponse {
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

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
  $name: String!
  ) {
    createUser(
      name: $name
    ) {
      id
      name
    }
  }
`;

export interface CreateUserMutationResponse {
  createUser: User;
  loading: boolean;
}

export const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation(
  $idToken: String!
  ) {
    authenticateUser(
      idToken: $idToken
    ) {
      id
      token
    }
  }
`;

export interface AuthenticateUserMutationResponse {
  authenticateUser: {id: string; token: string; };
}
