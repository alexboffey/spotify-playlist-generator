import gql from "graphql-tag";

export const GET_RECOMMENDATIONS_QUERY = gql`
  query GET_RECOMMENDATIONS_QUERY($seed_artists: String!) {
    getRecommendations(seed_artists: $seed_artists) {
      tracks {
        id
        name
        artists {
          id
          name
        }
        album {
          id
          name
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
      artists: { id: string; name: string };
      album: { id: string; name: string };
    }>;
  };
}
