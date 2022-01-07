import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
mutation authorize($data: AuthorizeInput) {
  authorize(credentials: $data) {
    accessToken
  }
}
`;

// other queries...