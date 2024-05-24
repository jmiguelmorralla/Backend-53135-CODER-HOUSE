import { Router } from "express";
import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
// import isValidData from "../../middlewares/isValidData.mid.js";
// import isValidEmail from "../../middlewares/isValidEmail.mid.js";
// import isValidUser from "../../middlewares/isValidUser.mid.js";
// import isValidPassword from "../../middlewares/isValidPassword.mid.js";
// import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  // isValidData,
  // isValidEmail,
  // createHashPassword,
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      await usersManager.create(data);
      return res.json({ statusCode: 201, message: "Registered." });
    } catch (error) {
      return next(error);
    }
  }
);
sessionsRouter.post(
  "/login",
  // isValidUser,
  // isValidPassword,
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 200, message: "Logged in." });
    } catch (error) {
      return next(error);
    }
  }
);
sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "Is online!",
        user_id: req.session.user_id,
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});
sessionsRouter.post("/signout", (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({ statusCode: 200, message: "Signed out." });
    }
    const error = new Error("Invalid credentials from signout...");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
