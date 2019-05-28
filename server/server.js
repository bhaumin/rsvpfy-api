import config from "./config";
import express from "express";
import apiRouter from "../api";
// import morgan from 'morgan';

const server = express();
const port = config.port;

// server.use(morgan());
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api", apiRouter);

// Generic error handler
// server.use(function(err, req, res, next) {
//   console.log("Unexpected Error: " + err);
//   res.status(500).send(err);
// });

server.listen(port, function() {
  console.log("Listening on port " + port);
});
