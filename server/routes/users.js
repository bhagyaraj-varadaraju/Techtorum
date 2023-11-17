import express from "express";

import * as UserController from "../controllers/users.js";
import * as PostController from "../controllers/posts.js";

const router = express.Router();

router.get("/:username", UserController.getUserProfile);
router.get(
  "/:username/follow-recommendations",
  UserController.getFollowRecommendations
);
router.get("/:username/followers", UserController.getUserFollowers);
router.get("/:username/following", UserController.getUserFollowing);
router.post("/:username/follow", UserController.followUser);
router.delete("/:username/follow", UserController.unfollowUser);
router.get("/:username/posts", PostController.getAllUserPosts);
router.put("/:username", UserController.editUserProfile);
router.delete("/:username", UserController.deleteProfile);

export default router;
