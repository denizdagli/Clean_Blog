const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/Post');
const port = 5000;

//connect db
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROUTES
app.get('/', async (req, res) => {
  const posts= await Post.find({})
  res.render('index',{
    posts
  });
});
app.get('/posts/:id', async (req, res) => {
  
  const post = await Post.findById(req.params.id)
  res.render('post',{
    post
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.post('/posts', async (req, res) => {
  await Post.create(req.body);
 res.redirect('/')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
