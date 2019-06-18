import gql from "graphql-tag";

export const GET_RECOMMENDATIONS_QUERY = gql`
  query GET_RECOMMENDATIONS_QUERY($seed_artists: String!) {
    getRecommendations(seed_artists: $seed_artists) {
      tracks {
        id
        name
        preview_url
        is_playable
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

export interface IGetRecommendationsQuery {
  getRecommendations: {
    tracks: Array<{
      id: string;
      name: string;
      preview_url?: string;
      is_playable: boolean;
      artists: Array<{ id: string; name: string }>;
      album: { id: string; name: string; images: Array<{ url: string }> };
    }>;
  };
}
