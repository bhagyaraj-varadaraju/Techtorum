import { pool } from "../config/database.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  const getUserProfileQuery = `SELECT username, avatarurl, bio FROM users where username = $1;`;
  try {
    const { rows } = await pool.query(getUserProfileQuery, [username]);
    res.status(201).json({ ...rows[0] });
  } catch (err) {
    console.error(err);
  }
};

export const editUserProfile = async (req, res) => {
  const { username } = req.params;
  const { bio, avatarurl } = req.body;
  const editUserProfileQuery = `UPDATE users set bio=$2, avatarurl=$3 where username = $1`;
  try {
    await pool.query(editUserProfileQuery, [username, bio, avatarurl]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const deleteProfile = async (req, res) => {
  const { username } = req.params;
  const deleteProfileQuery = `DELETE FROM users WHERE username = $1`;
  try {
    await pool.query(deleteProfileQuery, [username]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
