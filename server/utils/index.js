import express from "express";
import loadTestDataRoutes from "./loadTestData";

const router = express.Router();

router.use("/loadTestData", loadTestDataRoutes);

export default router;
