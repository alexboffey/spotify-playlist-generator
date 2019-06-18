import gql from "graphql-tag"

export const USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      spotifyId
    }
  }
`;

export interface IUserQuery {
  me: {
    id: string;
    name: string;
    email: string;
    spotifyId: string;
  };
}
