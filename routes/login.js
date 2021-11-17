const User = require ("../models/user")
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Register 
router.route("/register").post( async (req, res) => {
    //register logic
    try {
        // Get user input
        const {username, password} = req.body;

        // If username or password wasnt given
        if (username == '' || password == ''){
            return res.status(400).send({msg: "All inputs are required"});
        }

        // check if user already exist
        const oldUser = await User.findOne({username});
        

        if (oldUser){
            return res.status(400).send({msg: 'User already exist. Please login or try again with other username'});
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const newUser = new User({username: username,password: encryptedPassword});

        await newUser.save()
        .then(() => res.status(200).send({msg: 'Usser added succesfully!'}))
        .catch(err => res.status(400).send({msg: 'Error: ' + err}));
    } catch(err) {
        res.status(400).send({msg: err});
    }
});


router.route('/login').post(async (req,res) => {
    // login logic
    const {username, password} = req.body

    // Check if the user exists
    try{
        const user = await User.findOne({username:username})
        const isPassCorrect = await bcrypt.compare(password, user.password);

        // if the user exists and the password is correct
        if (user && (isPassCorrect)){
            const token = jwt.sign(
                {user: user},
                'secret', 
                {expiresIn:'25m'});

            res.status(200).json({ok:true,user:user,token});
        } else {
            return res.status(400).send({ok:false,msg:"Invalid user or password"})
        }

    } catch(err) {
        res.status(400).send({msg: 'Invalid user or password'});
    }
})


module.exports = router;