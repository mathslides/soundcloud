const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { ValidationError } = require("sequelize");
const bodyParser = require("body-parser");
const {  port } = require("./config");
const { environment } = require("./config");
const isProduction = environment === "production";
const db = require("./db/models");
const EmailVerify = require("./controller/VerfiEmail");

const app = express();
app.use(express.json({ limit: '100mb' })); 

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// if (!isProduction) {
//   // use cors only in dev
//   app.use(cors());
// }

app.use(cors({
  origin: '*',  // Adjust to your frontend origin
  credentials: true, // Allow cookies for CSRF token
}));

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// setting csrf token up and creating req.csrfToken
// app.use(
//   csurf({
//     cookie: {
//       secure: isProduction,
//       sameSite: isProduction && "Lax",
//       httpOnly: true,
//     },
//   })
// );


app.use(routes); // connect all the routes
app.get("/emailverify",  EmailVerify); 

// catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

//err formatting
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

// Check the database connection before starting the app
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection success! Sequelize is ready to use...");

    // Start listening for connections
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log("Database connection failure.");
    console.error(err);
  });


module.exports = app;
