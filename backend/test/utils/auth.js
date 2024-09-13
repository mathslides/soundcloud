const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");
const db = require("../db/models");
const { secret } = jwtConfig;

const expiresInTwoHours = 3600 * 2;

// Send a JWT cookie
const setTokenCookie = async (res, user) => {

  try {
    // Creating the token
    const token = jwt.sign(
      { data: user.toSafeObject() },
      secret,
      { expiresIn: expiresInTwoHours } // 2 hours
    );

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      maxAge: expiresInTwoHours * 1000, 
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax",
    });

    const body = {
      userId: user.id,
      token,
      expiredAt: new Date(Date.now() + expiresInTwoHours * 1000), 
      createdAt: new Date(),
    };
    const userToken = await db.LoginToken.create(body);
    return token;
  } catch (error) {
    console.error("Error in setTokenCookie:", error);
    throw error;
  }
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope("currentUser").findByPk(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

// No current user, return an error
const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 401;
    return next(err);
  },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };

