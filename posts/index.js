const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {}; //posts repository

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;
  //   const { name } = req.body;
  //   console.log(title);

  posts[id] = {
    id,
    title,
  };
  console.log(posts);

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
