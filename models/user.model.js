/**
 * This will hold the schema for the user
 * It explains the different fields of use and how it will be stored in mongoDB
*/

const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        default:"Customer",
        enum:["Customer","Admin"]
    }
},{timestamps:true}
);

/**
 * Define the collection name where it is stored
 */

module.exports=mongoose.model("User",userSchema);
