require("dotenv").config({ path: ".env" });
const passport = require("passport");
const server = require("./lib/createServer")();

// Middleware
require("./middleware/passport")(passport);
require("./middleware/server")(server);

// Routes
require("./routes/auth")(server);

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
