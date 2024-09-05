const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const db=require('./config/config');
const cookieParser=require('cookie-parser');
const User=require('./models/User');
const Admin=require('./models/Admin');
const Task=require('./models/Task');
const bcrypt=require('bcrypt');
const cors=require('cors');
const jwt=require('jsonwebtoken')
const app=express();

dotenv.config({path:path.join(__dirname,'config','config.env')});

const salt=bcrypt.genSaltSync(10);
const secret='ragelwefh4643';
const options={
    expiresIn:'1h'
}
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())

db();

function extractUsername(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token);

    if(!token){
        return res.status(401).json({error:'No token provided'})
    }
     
    jwt.verify(token,secret,(err,user)=>{
        if(err){
            return res.status(403).json({error:'Invalid token'})
        }
        console.log(user.id);
        req.user=user;
        next();
    })
}
app.post('/signup',async(req,res)=>{
    const {userName,email,password}=req.body;

    try{
        const user=new User({
            userName,
            email,
            password:bcrypt.hashSync(password,salt),
        });
        await user.save();
        res.status(201).json({message:'User registered Successfully'})
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Failed to register user'})
    }
})
app.post('/signupadmin',async(req,res)=>{
    const {userName,email,password}=req.body;

    try{
        const admin=new Admin({
            userName,
            email,
            password:bcrypt.hashSync(password,salt),
        });
        await admin.save();
        res.status(201).json({message:'User registered Successfully'})
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Failed to register user'})
    }
})

app.post('/login',async(req,res)=>{
    
    const {email,password}=req.body;

    const user=await User.findOne({email});
    console.log(user);
    if(!user){
        return res.status(400).json({error:'User not found'})
    }
    const pass=bcrypt.compareSync(password,user.password);
    if(pass){
        const payload={
            id:user._id
        }
        const token=jwt.sign(payload,secret,options);

        res.cookie('token',token).json({
            id:user._id,
            email:user.email,
            userName:user.userName,
            token:token,
        })
    }else{
        res.status(400).json('wrong credentials')
    }
})
app.post('/loginadmin',async(req,res)=>{
    
    const {email,password}=req.body;

    const admin=await Admin.findOne({email});
    console.log(admin);
    if(!admin){
        return res.status(400).json({error:'User not found'})
    }
    const pass=bcrypt.compareSync(password,admin.password);
    if(pass){
        const payload={
            id:admin._id
        }
        const token=jwt.sign(payload,secret,options);

        res.cookie('token',token).json({
            id:admin._id,
            email:admin.email,
            userName:admin.userName,
            token:token,
        })
    }else{
        res.status(400).json('wrong credentials')
    }
})

app.post('/tasks',async(req,res)=>{
   
    try{
        console.log(req.body)
        const {Subject,StartTime,EndTime,Description}=req.body;
        
        const newTask=new Task({
            subject:Subject,
            startTime:StartTime,
            endTime:EndTime,
            description:Description,
    })
    console.log(newTask)
     await newTask.save();
     res.status(201).json({message:'Task Saved Successfully'});
    }catch(err){
        res.status(500).json({message:'Server Error'})
    }
})
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().populate('user');
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
});


app.listen(process.env.PORT,()=>{
    console.log(`Server Listening on port ${process.env.PORT}`)
})