require("dotenv").config();
require('./config/db')()

const express = require("express");
const cors = require("cors");
const { shortener, redirecter } = require("./helpers/url-shortener")

const app = express();
// Basic Configuration
const port = process.env.PORT || 3010;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initiation
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", function (req, res) {
  const body = req.body;
  const { url } = body;

  shortener(url, (err, urlId) => {
    if (err) return res.json({ error: err.message })

    res.json({ original_url: url, short_url: urlId })
  })
});

app.get("/api/shorturl/:id", function (req, res) {
  const { id: shorturl } = req.params;

  redirecter(shorturl, (err, url) => {
    if (err) { res.json({ error: err.message }) }

    res.redirect(302, url);
  })
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
