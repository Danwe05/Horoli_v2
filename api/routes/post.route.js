import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { 
  addPost, 
  deletePost, 
  getPost, 
  getPosts, 
  updatePost, 
  getRelatedPosts, 
  addComment, 
  getComments, 
  addReview, 
  getReviews 
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/:id/related", getRelatedPosts); // new route for getting related posts
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

router.post("/:id/comments", verifyToken, addComment);
router.get("/:id/comments", getComments);

router.post("/:id/reviews", verifyToken, addReview);
router.get("/:id/reviews", getReviews);

export default router;