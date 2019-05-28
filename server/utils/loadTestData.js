import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";

const now = new Date();
const day1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const day2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const day3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
const day4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
const day5 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4);
const day6 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5);
const day7 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6);
const day8 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
const day9 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8);

MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(err, null);
  const db = client.db(config.dbName);

  deleteAllEvents(db).then(response => {
    insertEvents(db).then(response => {
      client.close();
    });
  });
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
          name: "Paryushan Day 1",
          desc: "",
          date: day1,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Paryushan Day 2",
          desc: "Mahavir Janma Vanchan",
          date: day2,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Paryushan Day 3",
          desc: "Chaudas",
          date: day3,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: false
        },
        {
          name: "Paryushan Day 4",
          desc: "",
          date: day4,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Paryushan Day 5",
          desc: "",
          date: day5,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Paryushan Day 6",
          desc: "",
          date: day6,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Paryushan Day 7",
          desc: "",
          date: day7,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: true
        },
        {
          name: "Paryushan Day 8",
          desc: "",
          date: day8,
          hasNavkarshi: false,
          hasLunch: true,
          hasDinner: false
        },
        {
          name: "Paryushan Parna Day",
          desc: "Parna",
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
