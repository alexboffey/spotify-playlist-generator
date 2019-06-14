module.exports = async function(parent, args, ctx, info) {
  // Check if logged in
  if (!ctx.request.userId) throw new Error("You must be logged in!");

  // If they do, run the query
  return ctx.database.query.users({}, info);
};
