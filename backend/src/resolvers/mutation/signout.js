module.exports = function(parent, args, ctx, info) {
  ctx.response.clearCookie("token"); // clearCookie method comes from cookieParser middleware
  return { message: "You are now signed out, goodbye!" };
};
