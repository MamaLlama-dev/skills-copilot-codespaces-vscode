// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments array
const commentsByPostId = {};

// Create route to get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to post comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex'); // Generate random id
  const { content } = req.body; // Get content from request body

  // Get comments array for post id, if any
  const comments = commentsByPostId[req.params.id] || [];

  // Push new comment into comments array
  comments.push({ id: commentId, content });

  // Set comments array for post id
  commentsByPostId[req.params.id] = comments;

  // Send response
  res.status(201).send(comments);
});

// Start server
app.listen(4001, () => {
  console.log('Listening on 4001');
});
