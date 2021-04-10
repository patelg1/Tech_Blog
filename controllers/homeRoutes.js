const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const {route} = require('./api/commentRoutes');


router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
            exclude: ['password']
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment,            
            include: {
              model: User,
              attributes: ['name']
            }
          }
        ],
      });
  
      const post = postData.get({ plain: true });
      
      res.render('singlepost', {
        post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: User,            
            attributes: ['name']            
          },
          {
            model: Comment,            
            include: {
              model: User,
              attributes: ['name']
            }
          }
        ],        
      });
  
      const posts = postData.map(post => post.get({ plain: true }));
  
      res.render('dashboard', {
        posts,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/newpost', (req, res) => {
  if(!req.session.logged_in){
    res.redirect('/login');
    return;
  }
  res.render('newpost');
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {          
          include: [
              {
                  model: User,
                  attributes: ['name'],
              },
              {
                  model: Comment,                  
                  include: {
                      model: User,
                      attributes: ['name']
                  }
              },
          ],
      });

      const post = postData.get({ plain: true });

      res.render('editpost', {
          post,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
  }
});
  
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// router.get('/signup', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/dasboard');
//     return;
//   }

//   res.render('signup');
// });
  
module.exports = router;