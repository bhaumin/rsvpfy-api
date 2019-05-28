import express from "express";
import eventsRoutes from "./events";

const router = express.Router();

// const app = express();

router.get("/", (req, res) => {
  // send back a json response
  res.json({ data: "RSVP API" });
});

router.use("/events", eventsRoutes);

export default router;
