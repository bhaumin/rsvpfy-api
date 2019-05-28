import express from "express";
import _ from "lodash";
import { MongoClient, ObjectID } from "mongodb";
import assert from "assert";
import config from "../../server/config";

const router = express.Router();

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

// Temp
const events = {};

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(err, null);
  mdb = client.db(config.dbName);
});

router.param("id", function(req, res, next, id) {
  mdb
    .collection("events")
    .findOne({
      _id: ObjectID(id)
    })
    .then(event => {
      if (!event) {
        res.status(404).send("Event with id " + id + " does not exist.");
      } else {
        req.event = event;
        next();
      }
    })
    .catch(console.error);
});

router.get("/", (req, res) => {
  // send back a json response
  mdb
    .collection("events")
    .find({ date: { $gte: today } })
    .toArray((err, events) => {
      assert.equal(err, null);
      res.json(events);
    });
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
