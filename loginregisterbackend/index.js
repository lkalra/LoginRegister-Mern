const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

function dbconnect(){
    mongoose.connect("mmongodb+srv://admin:test123@cluster0.yzp4dyk.mongodb.net/?retryWrites=true&w=majority/db").then(()=>{console.log("connected");}).catch((err)=>{console.log(err.message);})
}

dbconnect();

//schema
const uSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password:String,
},{versionKey:false})

//model
const User = new mongoose.model("User",uSchema)

//Routes
app.post("/login", async function(req, res){
    const {email, password} = req.body
    try {
        const user = await
        User.findOne({email:email})

        if(user){
            if(password===user.password){
                res.send({message:"Login Successfull",user:user})
            }
            else{
                res.send({message:"Wrong Password!"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    } catch (error) {
        res.send(err)
    }
})

app.post("/register", async function(req, res){

    const {name, email, password} = req.body

    try {
        const user = await
        User.findOne({email:email})
        
        if(user){
            res.send({message:"User already registered, Please login!"})
            // res.status(403).send({message:"User already registered"})
        }else{
            const user = new User({
                name: name,
                email: email,
                password: password
            })
            const myUser = user.save();
            
            if(!myUser){
                 res.send("Cannot register")
            }else{
                res.send({message:"successfully registered, Please Login!"})
            }
        }
    } catch (err) {
        if(err){
            res.send(err)
        }
    }
})

app.listen(port,function(){
    console.log("Server started "+ port)
})
