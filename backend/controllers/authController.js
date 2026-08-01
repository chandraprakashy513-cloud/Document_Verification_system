const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register User
exports.register = async(req,res)=>{

    try{

        const {name,email,password}=req.body;


        const existingUser = await User.findOne({email});


        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }


        const hashPassword = await bcrypt.hash(password,10);


        const user = await User.create({
            name,
            email,
            password:hashPassword
        });


        res.status(201).json({
            message:"Registration successful",
            user
        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Login User
exports.login = async(req,res)=>{

    try{

        const {email,password}=req.body;
        console.log(email, " : ",password)


        const user = await User.findOne({email});


        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }


        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log("isMatch: ",isMatch)
        console.log("Password: ", password)
        console.log("user.Password: ", hashedPassword)


        if(!isMatch){

            return res.status(400).json({
                message:"Invalid password"
            });

        }



        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );


        res.json({
            message:"Login successful",
            token,
            user
        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};