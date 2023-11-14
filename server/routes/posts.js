import express from "express";

import * as PostController from "../controllers/posts.js";

const router = express.Router();

router.get("/:username", PostController.getAllUserPosts);

router.post("/:username", PostController.createPost);
router.get("/:username/:post_id", PostController.viewPost);
router.put("/:username/:post_id", PostController.editPost);
router.delete("/:username/:post_id", PostController.deletePost);

export default router;
