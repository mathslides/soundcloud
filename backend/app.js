const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { ValidationError } = require("sequelize");
const bodyParser = require("body-parser");
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();
app.use(express.json({ limit: '100mb' })); 









console.log('');
console.log('----------- ENVIRONMENT VARIABLES');
console.log('DATABASE_URL ',process.env.DATABASE_URL);
console.log('DB_DIALECT   ',process.env.DB_DIALECT);
console.log('DB_HOST      ',process.env.DB_HOST);
console.log('DB_USERNAME  ',process.env.DB_USERNAME);
console.log('DB_PASSWORD  ',process.env.DB_PASSWORD);
console.log('DB_DATABASE  ',process.env.DB_DATABASE);
console.log('DB_PORT      ',process.env.DB_PORT);
console.log('DB_CLIENT    ',process.env.DB_CLIENT);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  // use cors only in dev
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// setting csrf token up and creating req.csrfToken
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);


app.use(routes); // connect all the routes

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

module.exports = app;
