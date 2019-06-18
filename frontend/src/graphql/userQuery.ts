import gql from "graphql-tag";

export const USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      spotifyId
      images {
        url
      }
    }
  }
`;

export interface IUserQuery {
  me: {
    id: string;
    name: string;
    email: string;
    spotifyId: string;
    images: Array<{ url: string }>;
  };
}
