import gql from "graphql-tag";

export const MY_TOP_ARTISTS_QUERY = gql`
  query {
    myTopArtists(limit: 5, time_range: short_term) {
      items {
        name
        id
        href
      }
      next
      previous
      total
      limit
      href
    }
  }
`;

export interface MyTopArtistsData {
  myTopArtists: {
    items: Array<{ name: string; id: string; href: string }>;
    next: string;
    previous: string;
    total: number;
    limit: number;
    href: string;
  };
}
