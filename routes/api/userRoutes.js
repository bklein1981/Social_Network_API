const User = require("../../models/user")

const {addUser, getUser} = requre("../../controllers/userController.js")


Router.route("/").get(getUsers).post(addUser)


//after you thought.create,


// then User.findOneAndUpdate() so tha you can ADD the new thought Id to the user's thoughts array