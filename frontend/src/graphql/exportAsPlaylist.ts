import gql from "graphql-tag";

export const EXPORT_AS_PLAYLIST_MUTATION = gql`
  mutation EXPORT_AS_PLAYLIST_MUTATION(
    $playlistName: String
    $tracks: [String]!
  ) {
    exportAsPlaylist(playlistName: $playlistName, tracks: $tracks) {
      name
    }
  }
`;

export interface IExportAsPlaylistMutation {
  exportAsPlaylist: {
    name: string;
  };
}
