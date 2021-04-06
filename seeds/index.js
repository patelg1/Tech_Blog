const sequelize = require('../config/connection');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedAll = async () => {
    await sequelize.sync({force:true});
    console.log('\n------------------ DATABASE SYNCED ----------------\n')

    await userData();
    console.log('\n------------------ USERS SYNCED ----------------\n')

    await postData();
    console.log('\n------------------ POSTS SYNCED ----------------\n')

    await commentData()
    console.log('\n------------------ COMMENTS SYNCED ----------------\n')

    process.exit(0);
};

seedAll();