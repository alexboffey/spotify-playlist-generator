const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async signup(parent, args, ctx, info) {
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
  },

  async signin(parent, { email, password }, ctx, info) {
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
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token"); // clearCookie method comes from cookieParser middleware
    return { message: "You are now signed out, goodbye!" };
  }
};
