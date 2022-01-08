import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
  repositories {
    edges {
      node {
        id
				name
        ownerName
        createdAt
        fullName
        reviewCount
        ratingAverage
        forksCount
        stargazersCount
        description
        language
        ownerAvatarUrl
      }
    cursor
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query GET_REPOSITORY($id: ID!) {
  repository (id: $id) {
    id
    name
    ownerName
    createdAt
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language
    ownerAvatarUrl
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;

