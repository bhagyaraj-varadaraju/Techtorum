import express from "express";

import * as UserController from "../controllers/users.js";
import * as PostController from "../controllers/posts.js";

const router = express.Router();

router.post("/:username", UserController.addUserProfile);
router.get("/:username", UserController.getUserProfile);
router.get("/:username/posts", PostController.getAllUserPosts);
router.put("/:username", UserController.editUserProfile);
router.delete("/:username", UserController.deleteProfile);

export default router;
