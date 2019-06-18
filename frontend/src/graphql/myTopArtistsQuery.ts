import gql from "graphql-tag";

export const MY_TOP_ARTISTS_QUERY = gql`
  query MY_TOP_ARTISTS_QUERY($limit: Int) {
    myTopArtists(limit: $limit, time_range: long_term) {
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
