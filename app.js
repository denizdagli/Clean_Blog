const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const Post = require('./models/Post');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET'],
}));

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);

app.get('/add_post',pageController.getAddPage);




app.get('/posts/edit/:id', pageController.getEditPage);




app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
