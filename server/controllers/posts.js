import { pool } from "../config/database.js";

export const getAllUserPosts = async (req, res) => {
  const { username } = req.params;
  const getAllUserPostsQuery = `SELECT p.*, u.username FROM posts p join users u on p.user_id = u.id WHERE u.username = $1;`;
  try {
    const { rows } = await pool.query(getAllUserPostsQuery, [username]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (req, res) => {
  const {user_id} = req.params;
  const { title, content, created_on } = req.body;
  const createPostQuery = `INSERT INTO posts (user_id, title, content, created_on) VALUES ($1, $2, $3, $4) RETURNING *;`;
  try {
    const { rows } = await pool.query(createPostQuery, [user_id, title, content, created_on]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const viewPost = async (req, res) => {
  const { post_id } = req.params;
  const viewPostQuery = `SELECT * FROM posts WHERE id = $1;`;
  try {
    const { rows } = await pool.query(viewPostQuery, [post_id]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const editPost = async (req, res) => { 
  const { post_id } = req.params;
  const { title, content, upvote_count, downvote_count, created_on } = req.body;
  const editPostQuery = `UPDATE posts SET title = $1, content = $2, upvote_count = $3, downvote_count = $4, created_on = $5 WHERE id = $6 RETURNING *;`;
  try {
    const { rows } = await pool.query(editPostQuery, [title, content, upvote_count, downvote_count, created_on, post_id]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async (req, res) => {
  const { post_id } = req.params;
  const deletePostQuery = `DELETE FROM posts WHERE id = $1;`;
  try {
    const { rows } = await pool.query(deletePostQuery, [post_id]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
  }
}
