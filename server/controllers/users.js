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

export const getUserFollowers = async (req, res) => {
  const { username } = req.params;
  const getUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const getUserFollowersQuery = `SELECT username, avatarurl FROM users WHERE id IN (SELECT following_id FROM follows WHERE followed_id = $1);`;
  try {
    const { rows: user_rows } = await pool.query(getUserIDQuery, [username]);
    const { rows } = await pool.query(getUserFollowersQuery, [
      user_rows[0]?.id,
    ]);
    res.status(201).json({ followers: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const getUserFollowing = async (req, res) => {
  const { username } = req.params;
  const getUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const getUserFollowingQuery = `SELECT id, username, avatarurl FROM users WHERE id IN (SELECT followed_id FROM follows WHERE following_id = $1);`;
  try {
    const { rows: user_rows } = await pool.query(getUserIDQuery, [username]);
    const { rows } = await pool.query(getUserFollowingQuery, [
      user_rows[0]?.id,
    ]);
    res.status(201).json({ following: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const getFollowRecommendations = async (req, res) => {
  const { username } = req.params;
  const getUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const getFollowRecommendationsQuery = `SELECT id, username, avatarurl FROM users WHERE id NOT IN (SELECT followed_id FROM follows WHERE following_id = $1) AND id != $1;`;
  try {
    const { rows: user_rows } = await pool.query(getUserIDQuery, [username]);
    const { rows } = await pool.query(getFollowRecommendationsQuery, [
      user_rows[0].id,
    ]);
    res.status(201).json({ recommendations: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const followUser = async (req, res) => {
  const { username } = req.params;
  const { followed_username } = req.body;
  const getUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const getFollowedUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const followUserQuery = `INSERT INTO follows (following_id, followed_id) VALUES ($1, $2);`;
  try {
    const { rows: user_rows } = await pool.query(getUserIDQuery, [username]);
    const { rows: followed_user_rows } = await pool.query(
      getFollowedUserIDQuery,
      [followed_username]
    );
    await pool.query(followUserQuery, [
      user_rows[0].id,
      followed_user_rows[0].id,
    ]);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const unfollowUser = async (req, res) => {
  const { username } = req.params;
  const { followed_username } = req.body;
  const getUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const getFollowedUserIDQuery = `SELECT id FROM users WHERE username = $1;`;
  const unfollowUserQuery = `DELETE FROM follows WHERE following_id = $1 AND followed_id = $2;`;
  try {
    const { rows: user_rows } = await pool.query(getUserIDQuery, [username]);
    const { rows: followed_user_rows } = await pool.query(
      getFollowedUserIDQuery,
      [followed_username]
    );
    await pool.query(unfollowUserQuery, [
      user_rows[0].id,
      followed_user_rows[0].id,
    ]);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
