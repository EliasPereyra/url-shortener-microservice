require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns')
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl/:url', function(req,res){
  const url = req.body
  res.json({ original_url: url, short_url: '' })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
