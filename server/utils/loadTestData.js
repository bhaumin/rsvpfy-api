import express from "express";
import { MongoClient } from "mongodb";
// import assert from "assert";
import config from "../config";

const router = express.Router();

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const day1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const day2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const day3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
const day4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
const day5 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4);
const day6 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5);
const day7 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6);
const day8 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
const day9 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8);

const client = new MongoClient(config.mongodbUri);

router.get("/", async (req, res) => {
  // send back a json response
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const mdb = client.db(config.dbName);
    await deleteAllEvents(mdb);
    await insertEvents(mdb);

    const col = mdb.collection("events");
    const events = await col.find({ date: { $gte: today } }).toArray();
    res.json(events);

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
});

const deleteAllEvents = db => {
  return new Promise((resolve, reject) => {
    // Get the documents collection
    const collection = db.collection("events");
    // Insert some documents
    collection
      .deleteMany({})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

const insertEvents = db => {
  return new Promise((resolve, reject) => {
    // Get the documents collection
    const collection = db.collection("events");
    // Insert some documents
    collection
      .insertMany([
        {
          name: "Event Day 1",
          desc: "",
          date: day1,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Event Day 2",
          desc: "More info about day 2 event",
          date: day2,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Event Day 3",
          desc: "More info about day 3 event",
          date: day3,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: false
        },
        {
          name: "EVent Day 4",
          desc: "",
          date: day4,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Event Day 5",
          desc: "",
          date: day5,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Event Day 6",
          desc: "",
          date: day6,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Event Day 7",
          desc: "",
          date: day7,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Event Day 8",
          desc: "",
          date: day8,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: false
        },
        {
          name: "Last Day Event",
          desc: "More info on last day event",
          date: day9,
          hasNavkarshi: true,
          hasLunch: false,
          hasDinner: false
        }
      ])
      .then(response => {
        console.info("events inserted:", response.insertedCount);
        resolve(response);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

export default router;
