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
          id
          name
          type
          images {
            url
          }
          genres
        }
      }
    }
  }
`;

export interface ISearchArtistsQuery {
  search: {
    artists: {
      items: Array<{
        id: string;
        name: string;
        images: Array<{ url: string }>;
        genres: Array<string>;
      }>;
    };
  };
}

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

export interface ISearchTracksQuery {
  search: {
    tracks: {
      items: Array<{ name: string }>;
    };
  };
}
