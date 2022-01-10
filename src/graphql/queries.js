import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query ($orderBy:AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword:String) {
  repositories (searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
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
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
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

