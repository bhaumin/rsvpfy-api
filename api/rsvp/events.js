import express from "express";
// import _ from "lodash";
import { MongoClient, ObjectID } from "mongodb";
// import assert from "assert";
import config from "../../server/config";

const router = express.Router();
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

// Temp
const events = {};
const client = new MongoClient(config.mongodbUri);

router.param("id", async function(req, res, next, id) {
  try {
    await client.connect();
    // console.log("Connected successfully to server");

    const mdb = client.db(config.dbName);
    const col = mdb.collection("events");
    const event = await col.findOne({ _id: ObjectID(id) });
    if (!event) {
      res.status(404).send("Event with id " + id + " does not exist.");
    } else {
      req.event = event;
      next();
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
});

router.get("/", async (req, res) => {
  // send back a json response
  try {
    await client.connect();
    // console.log("Connected successfully to server");

    const mdb = client.db(config.dbName);
    const col = mdb.collection("events");

    const events = await col.find({ date: { $gte: today } }).toArray();
    res.json(events);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
});

router.delete("/", (req, res) => {
  // TODO delete all events
  res.json(events);
});

router.post("/", (req, res) => {
  // console.log(req.body);
  var event = req.body.event;
  event.date = new Date(event.date);

  // TODO insert event

  res.json(events);
});

// get the parameters from the route
router.get("/:id", (req, res) => {
  res.json(req.event);
});

// get the parameters from the route
// update the event
router.put("/:id", (req, res) => {
  var event = req.body.event;
  if (event.id) {
    delete event.id;
  }

  event.date = new Date(event.date);
  // TODO update req.event
  res.json(events);
});

// get the parameters from the route
router.delete("/:id", (req, res) => {
  // TODO delete req.event
  res.json(events);
});

export default router;
