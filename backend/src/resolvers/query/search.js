const { spotifyApi } = require("../../services/spotify");

module.exports = async function(parent, args, ctx, info) {
  if (!ctx.request.userId) return null;

  const { body } = await spotifyApi.search(args.query, [args.type], {
    limit: args.limit
  });

  console.log(JSON.stringify(body, null, 2));

  return body;
};
