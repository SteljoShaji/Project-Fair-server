//import user model
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//register
exports.register = async (req,res)=>{
    console.log("inside register function");
    const {username,email,password} = req.body
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

    try{
  //check already existing user - findOne()
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("User already exists.. Please Login")
    }else{
        //register user
        const newUser = new users({
            username,email,password,image:"",github:"",linkedin:""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }

    }catch(err){
        res.status(401).json(`Error!!! Transation Failed: ${err}`)

    }
}

//login
exports.login = async (req,res)=>{
    console.log("Inside login function");
    const {email,password} = req.body
    try{
        //check user exist
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //generate token
            const token = jwt.sign({userId:existingUser._id},"superSecretKey123")
            res.status(200).json({
                existingUser,
                role:"user",
                token
            })
        }else{
            res.status(404).json("Incorrect email / password")
        }

    }catch(err){
        res.status(401).json(`Error!!! Transation Failed: ${err}`)
    }

}

//profile update
exports.updateProfile = async (req,res)=>{
    const profileImage = req.file?.filename
    const {username,email,password,github,linkedin}=req.body
    const userId = req.payload
    try{
      const updatingUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,image:profileImage,github,linkedin},{new:true})
      res.status(200).json(updatingUser)
    }catch(err){
      res.status(401).json(err)
    }
}