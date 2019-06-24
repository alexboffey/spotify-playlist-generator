require("dotenv").config({ path: ".env" });
const passport = require("passport");
const refresh = require("passport-oauth2-refresh");
const cookieParser = require("cookie-parser");

const { strategy, serializeUser, scope } = require("./services/spotify");
const {
  decodeJwt,
  populateUser,
  updateAccessToken
} = require("./middleware/server");
const { authenticate, authCallback, logout } = require("./routes/auth");
const server = require("./lib/createServer")();

// Passport middleware
passport.use(strategy);
refresh.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(serializeUser);

// Server middleware
server.express.use(cookieParser());
server.express.use(passport.initialize());
server.express.use(decodeJwt);
server.express.use(populateUser);
server.express.use(updateAccessToken);

// Routes
server.express.use(
  "/auth/spotify",
  passport.authenticate("spotify", { scope, showDialog: true }),
  authenticate
);
server.express.use("/auth/spotify/callback", authCallback);
server.express.use("/auth/logout", logout);

// Start server
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  ({ port }) => {
    console.log(`Server is now running on port: http://localhost:${port}`);
  }
);
