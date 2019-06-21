import gql from "graphql-tag";

import { IArtist } from "../interfaces";

export const MY_TOP_ARTISTS_QUERY = gql`
  query MY_TOP_ARTISTS_QUERY(
    $limit: Int = 20
    $time_range: TimeRange = long_term
  ) {
    myTopArtists(limit: $limit, time_range: $time_range) {
      items {
        id
        name
        genres
        images {
          url
        }
      }
    }
  }
`;

export interface IMyTopArtistsQuery {
  myTopArtists: {
    items: Array<IArtist>;
  };
}
