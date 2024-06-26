const {User} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const UserDict ={ 

register: async(req, res) => {

    try{
    const user = await User.create(req.body)
    if(!user)throw new Error("No user Found")
    jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY,function(err,token){
        if(err)throw new Error("no token created")
        res.cookie("usertoken", token, {
            httpOnly: true
            }).json({ msg: "success!"});
    });



    }catch(err){
        res.status(400).json(err)
    }
},
login: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res.cookie("usertoken", userToken, {
            httpOnly: true
        })
        .cookie("permission","true")
        .json({ msg: "success!" });
},
logout: (req, res) => {
    res.clearCookie('usertoken');
    res.clearCookie('permission');
    res.sendStatus(200);
}
}

module.exports = UserDict
