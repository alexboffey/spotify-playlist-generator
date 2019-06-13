const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const server = require("./createServer")();
const database = require("./connectDatabase");

// Middleware
server.express.use(cookieParser());

// // Decode JWT so we can get userId on each request
// server.express.use((req, res, next) => {
//   // Get token from request
//   const { token } = req.cookies;

//   if (token) {
//     const { userId } = jwt.verify(token, process.env.APP_SECRET);
//     // Put user id on to request for subsequent requests to access
//     req.userId = userId;
//   }

//   next();
// });

// // Middleware to populate the user on each request
// server.express.use(async (req, res, next) => {
//   if (!req.userId) return next();

//   const user = await database.query.user(
//     { where: { id: req.userId } },
//     "{ id, permissions, email, name }"
//   );
//   req.user = user;
//   next();
// });

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
