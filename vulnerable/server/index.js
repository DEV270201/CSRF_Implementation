const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./model/userModel");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors({
    origin : "*",
    credentials: true,
})); 

app.use(cookieParser());

const signJWT = async(id,secret)=>{
   return await promisify(jwt.sign)(id,secret);
}

const auth = async(req,res,next)=>{
    try{
        let token = req.header('authorization').split(" ")[1];
        if(!token){
            return next(new Error("User not logged in!"));
        }
        //jwt secret should not be revealed
        const decoder = await promisify(jwt.verify)(token, "hello");
        req.user = await User.findById(decoder);
        next();
    }catch(err){
        console.log("Error from the authenticator middleware : " , err);
        return next(err);
    }
}

app.get("/",(req,res)=>{
   console.log("request recieved");
   res.status(200).send("okay");
});

app.post("/register",async (req,res,next)=>{
   try{
       console.log("post request...");
       await User.create({
           email : req.body.email,
           password : req.body.password
       });
       res.status(201).json({
           status : "success",
           message : "user account created successfully!"
       });

   }catch(err){
       return next(err);
   }
});


app.post("/login",async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return next(new Error("User not found!"));
        }
        if((email !== user.email) || (password !== user.password)){
            return next(new Error("Invalid credentials!"));
        }
        const jwt = await signJWT(user.id,process.env.JWT_SECRET);

        res.cookie("jwt",jwt,{
            expires : new Date(Date.now()  + 7 * 360000),
            httpOnly : true
        });

        //generating csrf token using jwt. Do not reveal the secret
        const csrf = await signJWT(user.id,"mytoken");

        res.cookie("csrf",csrf,{
            expires : new Date(Date.now()  + 7 * 360000),
            httpOnly : true
        });

        res.status(200).json({
            status : "success",
            message : "User logged in successfully!"
        });

    }catch(err){
        console.log("error in login route");
        console.log(err);
        return next(err);
    }
});

app.get("/profile",auth,async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id);
        console.log("email : ",user.email);
        res.status(200).json({
            status : "success",
            email : user.email
        });
    }catch(err){
        console.log("error in profile");
        return next(err);
    }
});

app.post('/profile',auth,async(req,res,next)=>{
  try{
      const {email,csrf_token} = req.body;
      //checking if the csrf token is present or not. If the token is not present then the server will simply ignore the request.
      if(csrf_token != null){
         const decode_id = await promisify(jwt.verify)(csrf_token,"mytoken");
          if(decode_id === req.user.id){
              await User.findByIdAndUpdate(req.user.id,{email});
              res.status(200).json({
                  status : "success",
                  message : "Email updated successfully!",
                  email : email
              });
          }
      }else{
          res.send();
      }
  }catch(err){
      console.log("error in profile page...");
      return next(err);
  }
});

//global error middleware
app.use((err,req,res,_)=>{
   let error = {...err};
   console.log("in the global middleware");
   error.message = error.message || "Something went wrong!";
   error.statusCode = 500;
   res.status(error.statusCode).json({
       status : "Failed",
       message : error.message
   });
});

module.exports = app;