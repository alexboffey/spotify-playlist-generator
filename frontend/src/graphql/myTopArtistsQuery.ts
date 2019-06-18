import gql from "graphql-tag";

export const MY_TOP_ARTISTS_QUERY = gql`
  query {
    myTopArtists(limit: 5, time_range: short_term) {
      items {
        id
      }
    }
  }
`;

export interface IMyTopArtistsQuery {
  myTopArtists: {
    items: Array<{ id: string }>;
  };
}
