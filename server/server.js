import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import FeedRoutes from "./routes/feed.js";
import passport from "passport";
import { GitHub } from "./config/auth.js";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(GitHub);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/", (req, res) => {
  res.redirect("http://localhost:5173/");
});

app.get("/failure", (req, res) => {
  res.redirect("http://localhost:5173/login");
});

app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/feed", FeedRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
