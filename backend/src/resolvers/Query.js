const { hasPermission } = require("./helpers")

module.exports = {
  me(parent, args, ctx, info) {
    // Check if we have a userId on the request aka if a user is logged in
    //  Return promise directly
    if (!ctx.request.userId) return null; // Return null as noone is logged in
    return ctx.database.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // Check if logged in
    // if (!ctx.request.userId) {
    //   throw new Error("You must be logged in!");
    // }
    // If they do, run the query
    return ctx.database.query.users({}, info);
  }
};
