const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {}; //stores the comments in a specific post

app.get("/post/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  //this id is the post id
  const { context } = req.body;
  const commentId = randomBytes(4).toString("hex"); //no db so id randomly generated for each comment on the post
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, context });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening to port 4001");
});
