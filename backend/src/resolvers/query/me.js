const { spotifyApi } = require("../../services/spotify");

module.exports = async function(parent, args, ctx, info) {
  if (!ctx.request.userId) return null;
  // Get user from prisma DB
  const dbUser = await ctx.database.query.user(
    {
      where: { id: ctx.request.userId }
    },
    info
  );
  // Get account info from spotify
  const apiUser = await spotifyApi.getMe();

  return { ...dbUser, images: apiUser.body.images };
};
