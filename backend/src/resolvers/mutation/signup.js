const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async function(parent, args, ctx, info) {
  // Normalise email addresses
  args.email = args.email.toLowerCase();
  // Hash + Salt password
  const password = await bcrypt.hash(args.password, 10);
  // Create user in db
  const user = await ctx.database.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: { set: ["USER"] }
      }
    },
    info
  );
  // Create JWT token & sign user in
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // Set JWT as a cookie on the response
  ctx.response.cookie("token", token, {
    httpOnly: true, // Cant be accessed by client side js
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });
  // Finally return user to browser
  return user;
};
