const mongoose=require('mongoose');
const {Schema,model}=mongoose;


const AdminSchema=new Schema({

    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const AdminModel=model('Admin',AdminSchema);

module.exports=AdminModel;