const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async function(parent, { email, password }, ctx, info) {
  // Check if there is a user with that email
  const user = await ctx.database.query.user({ where: { email } });
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  // Check if password is correct
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error(`Invalid password.`);
  }
  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // Set cookie with token
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  // Return user
  return user;
};
