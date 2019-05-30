import config from "./config";
import express from "express";
import apiRouter from "../api";
import utilsRouter from "./utils";
// import morgan from 'morgan';

const server = express();
const port = config.port;

// server.use(morgan());
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api", apiRouter);

if (config.nodeEnv === "development") {
  server.use("/utils", utilsRouter);
}

// Generic error handler
// server.use(function(err, req, res, next) {
//   console.log("Unexpected Error: " + err);
//   res.status(500).send(err);
// });

server.listen(port, function() {
  console.log("Listening on port " + port);
});
