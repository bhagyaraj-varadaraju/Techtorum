import { pool } from "../config/database.js";

export const getUserProfile = async (req, res) => {
  console.log(req.params);
  const { username } = req.params;
  console.log(username);
  const getUserProfileQuery = `SELECT up.* FROM user_profile up join users u on up.user_id = u.id WHERE u.username = $1;`;
  try {
    const { rows } = await pool.query(getUserProfileQuery, [username]);
    console.log(rows);
    res.status(201).json({ ...rows[0], username });
  } catch (err) {
    console.error(err);
  }
};

export const addUserProfile = async (req, res) => {
  const { username } = req.params;
  const { bio, avatar_url } = req.body;
  const addUserProfileQuery = `INSERT INTO user_profile (user_id, bio, avatar_url, created_on) VALUES ((select id from users where username = $1), $2, $3, NOW()) RETURNING *`;
  try {
    const { rows } = await pool.query(addUserProfileQuery, [
      username,
      bio,
      avatar_url,
    ]);
    res.status(201).json({ ...rows[0], username });
  } catch (err) {
    console.error(err);
  }
};

export const editUserProfile = async (req, res) => {
  const { username } = req.params;
  const { bio, avatar_url } = req.body;
  const editUserProfileQuery = `UPDATE user_profile set bio=$2, avatar_url=$3 where user_id = (select id from users where username = $1)`;
  try {
    await pool.query(editUserProfileQuery, [username, bio, avatar_url]);
    res.status(200);
  } catch (err) {
    console.error(err);
  }
};

export const deleteProfile = async (req, res) => {
  const { username } = req.params;
  const deleteProfileQuery = `DELETE FROM user_profile WHERE user_id = (select id from users where username = $1)`;
  try {
    await pool.query(deleteProfileQuery, [username]);
    res.status(200);
  } catch (err) {
    console.error(err);
  }
};
