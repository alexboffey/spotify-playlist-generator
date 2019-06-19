const { shuffle } = require("lodash");
const { spotifyApi } = require("../../services/spotify");

module.exports = async function(parent, args, ctx, info) {
  if (!ctx.request.userId) return null;

  const { body: topArtistsResponse } = await spotifyApi.getMyTopArtists({
    limit: 50
  });

  const seed_artists = shuffle(topArtistsResponse.items)
    .slice(0, 1)
    .map(({ id }) => id)
    .join(",");


  const { body: recommendationsResponse } = await spotifyApi.getRecommendations(
    {
      seed_artists
    }
  );

  return recommendationsResponse;
};
