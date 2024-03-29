const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const User = require("../DataBase/userSchema")
const Otp = require("../DataBase/optSchema")


// taking data from req.body and store the data in mongodb Database 
const Register = async(req,res)=>{
    const {name,email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message:"email or password are missing"})
    }

    try{
        const userExist = await User.findOne({email:email})

        if(userExist){
            res.status(422).json({error:"user is alredy exists"})
        }
        else{
            const user = new User({name,email,password})
            await user.save()
            res.status(200).json({message:"sucsessfull"})
        }   

    }catch(err){
        console.log(err)
        res.send(err)
    } 
}

//Adding login Authentication through here and creating the jwt tokens for auth 
const Login = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            res.status(400).json({error:"email and password booth are require"})
        }

        const userLogin = await User.findOne({email:email})

        if(!userLogin){
            res.status(404).json({error:"email not found"})   
        }
        else{
            
            const isMatch = await bcrypt.compare(password,userLogin.password);

            // adding jwt token
            const token = jwt.sign(
                { user_id: User._id, email },
                process.env.private_key,
                {
                  expiresIn: "2h",
                }
              );
              // save user token
              User.token = token;
        
            // store jwt token in cookie 
            res.cookie("jwttoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            })

            if(!isMatch){
                console.log("we are in not ismatch")
                res.status(400).json({message:"invalid password"})
            }
            else{
                res.status(200).json(userLogin)
            }
        }

    }catch(err){
        console.log("error in signin auth")
        console.log(err)
        res.send(err)
    }
}

// getting data from id
const GetDataById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.find({_id:{ $in: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
  
// updating data by id
const UpdateDataById = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  

// adding forget email to opts data collections in database
const SendMail = async(req,res)=>{
    const email = req.body.email
    if(!email){
        res.status(400).json({error:"email are require"})
    }
    try{
        const emailExist = await User.findOne({email:email})

    if(emailExist){
        const OtpCode = Math.floor((Math.random()*10000+1))
        const OtpData = new Otp({
            email,
            otp:OtpCode,
            expireIn: new Date().getTime() + 300*1000
        })
        await OtpData.save()

        try{
            const mailTransporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"abc@gmail.com",
                    pass:"abc@1234"
                }
            })
            const details = {
                from:"jayram.bagal.it@ghrcem.raisoni.net",
                to:email,
                subject:`Your ClassCarft reset password OTP is ${OtpCode}`,
                text:`Your one time password for resetting the password is ${OtpCode}`
            }
            
            mailTransporter.sendMail(details,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("mail send successfully");
                }
            })
        }catch(err){
            console.log("error in sending emale to email");
            res.send(err)
        }
        

        res.status(200).json({success:"send opt done"})
    }
    else{
        res.status(400).json({error:"email does not exists"})
    }
    }catch(err){
        console.log(err)
        res.send(400)
    }  
}

// validating the otp and changeing the password with new one
const ChangePass = async(req,res)=>{
    const data = await Otp.findOne({email:req.body.email , otp:req.body.Otp})

    if (data){
        const currentTime = new Date().getTime();
        const diff  = data.expireIn - currentTime

        if (diff<0){
            res.status(400).json({message:"otp is expire"})
        }
        else{
            const user = await User.findOne({email:req.body.email})
            user.password = req.body.password
            await user.save()
            res.status(200).json({message:"reset password successfully"})
        }
    }
    else{
        res.status(400).json({error:"invalid otp"})
    }
}

const HomePage = (req,res)=>{
    res.status(200).send("Welcome 🙌 ");
}


// logout
const Logout = (req,res)=>{
    console.log("we are in logout")
    res.clearCookie("jwttoken",{path:"/"})
    res.status(200).send("user logout")
}

module.exports = {  Register,
                    Login,
                    SendMail,
                    ChangePass,
                    HomePage,
                    GetDataById,
                    UpdateDataById,
                    Logout }
