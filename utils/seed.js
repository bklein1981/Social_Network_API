const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeeds } = require('./userData');
const { thoughtSeeds } = require('./thoughtData');

connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });

connection.once('open', async () => {
    console.log('Connected');
    //check if users is already populated
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();    
   //drop collection if users is already populated for reseeding
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    
    //checks if thoughts is already populated
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    //drop collection if thoughts is already populated for reseeding
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    const userData = userSeeds();
     const  userInfo = []
   
    for (let i = 0; i < 4; i++) {
        const users = {
            userName: userData[i].userName,
            email: userData[i].email
        }
        userInfo.push(users)
    }

    await User.collection.insertMany(userInfo)

    const thoughtData = thoughtSeeds();
    const thoughtInfo = []

    for (let i = 0; i < 4; i++) {
        const thoughts = {
            thoughtText: thoughtData[i].thoughtText,
            username: thoughtData[i].username
        }
        thoughtInfo.push(thoughts)
    }

    await Thought.collection.insertMany(thoughtInfo)
    
})