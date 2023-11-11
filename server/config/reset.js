import { pool } from "./database.js";
import "./dotenv.js";

const dropAllTables = async () => {
  const TABLES = [
    "users",
    // "user_profile",
    "follows",
    "posts",
    "comments",
    "votes",
  ];

  await Promise.all(
    TABLES.map(async (table) => {
      await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
    })
  );
};

const createUsersTable = async () => {
  const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        github_id VARCHAR(50) UNIQUE,
        username VARCHAR(50) UNIQUE NOT NULL,
        avatarurl TEXT,
        bio VARCHAR(255),
        accesstoken VARCHAR(255),
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
  try {
    const res = await pool.query(createUsersTableQuery);
    console.log("🎉 Users Table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating Users Table", err);
  }
};

const createUserProfileTable = async () => {
  const createUserProfileTableQuery = `CREATE TABLE IF NOT EXISTS user_profile (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE NOT NULL,
        bio VARCHAR(255),
        avatar_url VARCHAR(255),
        created_on TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
    `;
  try {
    const res = await pool.query(createUserProfileTableQuery);
    console.log("🎉 User Profile Table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating User Profile Table", err);
  }
};

const createPostsTable = async () => {
  const createPostsTableQuery = `CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        tags VARCHAR(255),
        created_on TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
    `;
  try {
    const res = await pool.query(createPostsTableQuery);
    console.log("🎉 Posts Table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating Posts Table", err);
  }
};

const createCommentsTable = async () => {
  const createCommentsTableQuery = `CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_on TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
    );
    `;
  try {
    const res = await pool.query(createCommentsTableQuery);
    console.log("🎉 Comments Table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating Comments Table", err);
  }
};

const createVotesTable = async () => {
  const createVotesTableQuery = `CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        type VARCHAR(10) NOT NULL,
        created_on TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
    );
    `;
  try {
    const res = await pool.query(createVotesTableQuery);
    console.log("🎉 Votes Table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating Votes Table", err);
  }
};

const createFollowsTable = async () => {
  const createFollowsTableQuery = `CREATE TABLE IF NOT EXISTS follows (
        following_id INTEGER NOT NULL,
        followed_id INTEGER NOT NULL,
        created_on TIMESTAMP NOT NULL,
        PRIMARY KEY (following_id, followed_id),
        FOREIGN KEY (following_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (followed_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );
    `;
  try {
    const res = await pool.query(createFollowsTableQuery);
    console.log("🎉 Follows Table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating Follows Table", err);
  }
};

const createTables = async () => {
  await dropAllTables();
  await createUsersTable();
  // await createUserProfileTable();
  await createPostsTable();
  await createCommentsTable();
  await createVotesTable();
  await createFollowsTable();
};

createTables();
