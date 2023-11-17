import express from "express";

import * as FeedController from "../controllers/feed.js";

const router = express.Router();

router.get("/:username", FeedController.getFeed);

export default router;
