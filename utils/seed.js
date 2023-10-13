const connection = require('../config/connection');
const { User } = require('../models');
const { userSeeds } = require('./userData');

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

    
})