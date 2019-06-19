import gql from "graphql-tag";

export const MY_TOP_TRACKS_QUERY = gql`
  query MY_TOP_TRACKS_QUERY(
    $limit: Int = 20
    $time_range: TimeRange = long_term
  ) {
    myTopTracks(limit: $limit, time_range: $time_range) {
      items {
        name
        id
        href
        album {
          name
        }
      }
      next
      previous
      total
      limit
      href
    }
  }
`;

export interface IMyTopTracksQuery {
  myTopTracks: {
    items: Array<{ name: string; id: string; href: string }>;
    next: string;
    previous: string;
    total: number;
    limit: number;
    href: string;
  };
}
