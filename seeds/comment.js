const {Comment} = require('../models');
const commentData = [
    {
        "user_id": 1,
        "post_id": 2,
        "text": "This is very interesting"
    },
    {
        "user_id": 2,
        "post_id": 4,
        "text": "Fascinating ideas"
    },
    {
        "user_id": 3,
        "post_id": 6,
        "text": "That is very helpful"
    },

]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;