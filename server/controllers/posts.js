import { pool } from "../config/database.js";

export const getAllUserPosts = async (req, res) => {
  const { username } = req.params;
  const getAllUserPostsQuery = `SELECT p.*, u.username FROM posts p join users u on p.user_id = u.id WHERE u.username = $1;`;
  try {
    const { rows } = await pool.query(getAllUserPostsQuery, [username]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const createPost = async (req, res) => {
  const { username } = req.params;
  const { title, content } = req.body;
  const getUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const createPostQuery = `INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *;`;
  try {
    const { rows: user_rows } = await pool.query(getUserIDQuery, [username]);
    const { rows } = await pool.query(createPostQuery, [
      user_rows[0].id,
      title,
      content,
    ]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const viewPost = async (req, res) => {
  const { post_id } = req.params;

  const viewPostQuery = `
  SELECT p.*, u.username, u.avatarurl
  FROM posts p
  JOIN users u ON p.user_id = u.id
  WHERE p.id = $1;
`;

  try {
    const { rows } = await pool.query(viewPostQuery, [post_id]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const editPost = async (req, res) => {
  const { post_id } = req.params;
  const { title, content, upvote_count, downvote_count, created_on } = req.body;
  const editPostQuery = `UPDATE posts SET title = $1, content = $2, upvote_count = $3, downvote_count = $4, created_on = $5 WHERE id = $6 RETURNING *;`;
  try {
    const { rows } = await pool.query(editPostQuery, [
      title,
      content,
      upvote_count,
      downvote_count,
      created_on,
      post_id,
    ]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
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
    res.status(500).json({ success: false });
  }
};
