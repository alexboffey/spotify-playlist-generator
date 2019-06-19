import gql from "graphql-tag";

export const SEARCH_ARTISTS_QUERY = gql`
  query SEARCH_ARTISTS_QUERY(
    $query: String!
    $type: SearchType = artist
    $limit: Int
  ) {
    search(query: $query, type: $type, limit: $limit) {
      artists {
        items {
          name
        }
      }
    }
  }
`;

export const SEARCH_TRACKS_QUERY = gql`
  query SEARCH_ARTISTS_QUERY(
    $query: String!
    $type: SearchType = track
    $limit: Int
  ) {
    search(query: $query, type: $type, limit: $limit) {
      tracks {
        items {
          name
        }
      }
    }
  }
`;

export interface ISearchQuery {
  search: string;
  type: string;
}
