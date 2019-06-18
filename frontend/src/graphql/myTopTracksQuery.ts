import gql from "graphql-tag";

export const MY_TOP_TRACKS_QUERY = gql`
  query {
    myTopTracks(limit: 5, time_range: short_term) {
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

export interface MyTopTracksData {
  myTopTracks: {
    items: Array<{ name: string; id: string; href: string }>;
    next: string;
    previous: string;
    total: number;
    limit: number;
    href: string;
  };
}
