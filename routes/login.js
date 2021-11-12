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

        // Validation input´
        if (!(username && password)){
            res.status(400).send("All inputs are required");
        }

        // check if user already exist
        const oldUser = await User.findOne({username});

        if (oldUser){
            return res.status(409).send("User already exist. Please login or try again with other username");
        }

        //Encrypt user password
        encryptedPassword = await bccrypt.hash(password, 10);

        // Create user in our database
        const newUser = new User({username,encryptedPassword});
        newUser.save()
        .then(() => res.status(200).send({message: 'Usser added succesfully!'}))
        .catch(err => res.status(400).send({message: 'Error: ' + err}));
    } catch(err) {
        console.log(err);
    }
});


router.route('/login').post(async (req,res) => {
    // login logic
    try{
        const {username, password} = req.body

        // Check if the user exists
        const user = await User.findOne({username:username})
        console.log(username);
        console.log(user);
        //const a = await bcrypt.compare(password, user.password);
        //console.log(a);
        // if the user exists and the password is correct
        if (user && (user.password == password)){
            const token = jwt.sign({
                user: user
            }, 'secret', {expiresIn:'24'});

            res.status(200).json({ok:true,user:user,token});
        } else {
            return res.status(400).send({ok:false,message:"Clave incorrecta"})
        }

    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
})


module.exports = router;