import gql from "graphql-tag";

import { ITrack } from "../interfaces";

export const MY_TOP_TRACKS_QUERY = gql`
  query MY_TOP_TRACKS_QUERY(
    $limit: Int = 20
    $time_range: TimeRange = long_term
  ) {
    myTopTracks(limit: $limit, time_range: $time_range) {
      items {
        name
        id
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            url
          }
        }
      }
    }
  }
`;

export interface IMyTopTracksQuery {
  myTopTracks: {
    items: Array<ITrack>;
  };
}
