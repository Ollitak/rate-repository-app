import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repositories ($after:String, $first:Int, $orderBy:AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword:String) {
  repositories (after: $after, first: $first, searchKeyword: $searchKeyword ,orderBy: $orderBy, orderDirection: $orderDirection) {
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
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query GET_REPOSITORY($first: Int, $after: String, $id: ID!) {
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
    reviews (first:$first, after:$after) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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

