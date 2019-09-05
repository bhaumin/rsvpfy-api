const env = process.env;

export default {
  mongodbUri: "mongodb://localhost:27017",
  dbName: "jcnc",
  port: env.PORT || 8080,
  nodeEnv: env.NODE_ENV || "development"
};
