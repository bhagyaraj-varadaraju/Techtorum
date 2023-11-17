import { pool } from "../config/database.js";

export const getFeed = async (req, res) => {
  const { username } = req.params;

  const getFeedQuery = `
                SELECT u.username, u.avatarurl, p.id, p.title, p.content, p.created_on 
                FROM posts p 
                JOIN users u ON p.user_id = u.id 
                WHERE u.id IN (
                        SELECT followed_id 
                        FROM follows 
                        WHERE following_id = (
                                SELECT id 
                                FROM users 
                                WHERE username = $1
                        )
                )
                UNION
                SELECT u.username, u.avatarurl, p.id, p.title, p.content, p.created_on 
                FROM posts p 
                JOIN users u ON p.user_id = u.id 
                WHERE u.username = $1
                ORDER BY created_on DESC;`;

  try {
    const { rows } = await pool.query(getFeedQuery, [username]);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
