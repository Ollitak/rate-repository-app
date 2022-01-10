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


// other queries...