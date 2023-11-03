export const getAllUserPosts = async (req, res) => {
  const { username } = req.params;
  const getAllUserPostsQuery = `SELECT p.*, u.username FROM posts p join users u on p.user_id = u.id WHERE u.username = $1;`;
  try {
    const { rows } = await pool.query(getAllUserPostsQuery, [username]);
    return rows;
  } catch (err) {
    console.error(err);
  }
};
