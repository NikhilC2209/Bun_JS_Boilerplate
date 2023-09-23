import express from "express";
import bodyParser from "body-parser";

import { test_exports, db } from "./db.js";

const router = express.Router();
const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const authRoute = require("./routes/auth");
const loginRoute = require("./routes/login");
// const privateRoute = require("./routes/private");
// app.use("/auth", authRoute);
app.use("/login", loginRoute);
// app.use("/private", privateRoute);

app.get("/", (req, res) => {
  test_exports();
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});