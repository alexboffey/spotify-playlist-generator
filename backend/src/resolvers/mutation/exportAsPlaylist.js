const { spotifyApi } = require("../../services/spotify");

module.exports = async function(parent, args, ctx, info) {
  if (!ctx.request.userId) return null;
  if (!ctx.request.user.spotifyId)
    throw new Error("Missing spotifyId for user.");
  if (!args.tracks) throw new Error("Missing tracks argument.");

  // First create a playlist
  const { body: createdPlaylist } = await spotifyApi.createPlaylist(
    ctx.request.user.spotifyId,
    args.playlistName || "Spotify Toolkit Playlist"
  );

  // Then populate playlist with supplied tracks
  await spotifyApi.addTracksToPlaylist(createdPlaylist.id, args.tracks);

  // Finally request back the playlist now its been updated
  const { body: createdPlaylistWithTracks } = await spotifyApi.getPlaylist(
    createdPlaylist.id
  );

  return createdPlaylistWithTracks;
};
