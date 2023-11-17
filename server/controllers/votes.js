import { pool } from "../config/database.js";

export const getVotes = async (req, res) => {
  const { post_id } = req.params;

  const getVotesQuery = `
        SELECT 
            SUM(CASE WHEN type = 'upvote' THEN 1 ELSE 0 END) AS upvotes,
            SUM(CASE WHEN type = 'downvote' THEN 1 ELSE 0 END) AS downvotes
        FROM votes
        WHERE post_id = $1;
    `;

  try {
    const { rows } = await pool.query(getVotesQuery, [post_id]);
    const { upvotes, downvotes } = rows[0];
    res.status(201).json({ success: true, upvotes, downvotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const upvotePost = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;

  const checkIfVotedQuery = `SELECT * FROM votes WHERE user_id = $1 AND post_id = $2;`;
  const upvotePostQuery = `INSERT INTO votes (user_id, post_id, type) VALUES ($1, $2, 'upvote');`;

  try {
    const { rows: vote_rows } = await pool.query(checkIfVotedQuery, [
      user_id,
      post_id,
    ]);

    if (vote_rows.length === 0) {
      await pool.query(upvotePostQuery, [user_id, post_id]);
    }
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const downvotePost = async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;

  const checkIfVotedQuery = `SELECT * FROM votes WHERE user_id = $1 AND post_id = $2;`;
  const downvotePostQuery = `INSERT INTO votes (user_id, post_id, type) VALUES ($1, $2, 'downvote');`;

  try {
    const { rows: vote_rows } = await pool.query(checkIfVotedQuery, [
      user_id,
      post_id,
    ]);

    if (vote_rows.length === 0) {
      await pool.query(downvotePostQuery, [user_id, post_id]);
    }
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
