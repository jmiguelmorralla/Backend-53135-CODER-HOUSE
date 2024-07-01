import environment from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import argsUtil from "./src/utils/args.util.js";

import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import morgan from "morgan";
import __dirname from "./utils.js";
// import { engine } from "express-handlebars";
// import dbConnect from "./src/utils/dbConnect.util.js";

const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => {
  console.log("Server ready on port: " + port + ".");
  // await dbConnect();
  // conexión a mongo desde factory
};

const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);

socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);

// server.engine("handlebars", engine());
// server.set("view engine", "handlebars");
// server.set("views", __dirname + "/src/views");

// Middlewares

server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(morgan("dev"));
server.use(cookieParser(environment.SECRET));
server.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
  })
);

// endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

