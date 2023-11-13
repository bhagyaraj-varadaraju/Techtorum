import express from "express";

import * as PostController from "../controllers/posts.js";

const router = express.Router();

router.get("/:username", PostController.getAllUserPosts);

router.post("/:username", PostController.createPost);
router.get("/:username/:postID", PostController.viewPost);
router.put("/:username/:postID", PostController.editPost);
router.delete("/:username/:postID", PostController.deletePost);

export default router;
