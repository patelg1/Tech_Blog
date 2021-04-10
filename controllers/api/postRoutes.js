const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/edit/:id', withAuth, async (req, res) => {
  console.log(req.body)
  try {
    const postData = await Post.update({
      title:req.body.title,
      content:req.body.content
      },
      {
        where: {
          id: req.params.id,          
        }
      });
    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  }catch (err) {
    res.status(400).json(err);
  }
});
  
  router.delete('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,          
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No blog post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;