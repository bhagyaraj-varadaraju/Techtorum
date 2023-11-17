import express from "express";

import * as VotesController from "../controllers/votes.js";

const router = express.Router();

router.get("/:post_id", VotesController.getVotes);
router.post("/upvote/:post_id", VotesController.upvotePost);
router.post("/downvote/:post_id", VotesController.downvotePost);

export default router;
