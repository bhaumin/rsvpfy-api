import express from "express";
import rsvpRoutes from "./rsvp";

const router = express.Router();

// const app = express();

router.get("/", (req, res) => {
  // send back a json response
  res.json({ data: "JCNC API" });
});

router.use("/rsvp", rsvpRoutes);

export default router;
