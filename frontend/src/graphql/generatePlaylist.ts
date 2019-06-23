import gql from "graphql-tag";

export const GENERATE_PLAYLIST_QUERY = gql`
  query GENERATE_PLAYLIST_QUERY($seeds: String) {
    generatePlaylist(seeds: $seeds) {
      tracks {
        id
        name
        preview_url
        uri
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
      seeds {
        id
        type
      }
    }
  }
`;

export interface IGeneratePlaylistQuery {
  generatePlaylist: {
    tracks: Array<{
      id: string;
      name: string;
      uri: string;
      preview_url?: string;
      artists: Array<{ id: string; name: string }>;
      album: { id: string; name: string; images: Array<{ url: string }> };
    }>;
    seeds: Array<{
      id: string;
      type: string;
    }>;
  };
}
