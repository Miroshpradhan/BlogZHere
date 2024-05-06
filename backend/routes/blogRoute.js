const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/text', (req, res) => {
  const { text } = req.body;
 
  res.json({ success: true, message: 'Text post created successfully' });
});

router.post('/picture', upload.single('picture'), (req, res) => {
  const pictureUrl = req.file.path; 
  
  res.json({ success: true, message: 'Picture post created successfully' });
});

router.post('/video', upload.single('video'), (req, res) => {
  const videoUrl = req.file.path; 
  
  res.json({ success: true, message: 'Video post created successfully' });
});

module.exports = router;
