import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
mutation authorize($data: AuthorizeInput) {
  authorize(credentials: $data) {
    accessToken
  }
}
`;

export const NEW_REVIEW = gql`
mutation createReview($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    repositoryId
  }
}
`;

export const CREATE_USER = gql`
mutation createUser($user: CreateUserInput) {
  createUser(user: $user) {
    id
  }
}
`;

export const DELETE_REVIEW = gql`
mutation deleteReview($id: ID!) {
  deleteReview(id: $id) 
}
`;



// other queries...