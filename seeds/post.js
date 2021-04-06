const {Post} = require('../models');
const postData = [
    {
        "title": "Taskmaster goes public!",
        "content": "A mobile app to create a personal todo list, color-coded for different tasks",        
    },
    {
        "title": "Javascript is fun!",
        "content": "Learning javascript was challenging but once you get it, the world opens up"
    },
    {
        "title": "Weather is wild!",
        "content": "Why can't it be summer already. One day its nice out and next day it's super cold"
    }
]

const seedPosts = () => {
    Post.bulkCreate(postData);
}

module.exports = seedPosts;