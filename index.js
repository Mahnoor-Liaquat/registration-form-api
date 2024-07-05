const express = require("express");
const mongoose = require("mongoose");
const RegisterModel = require('./models/Register')

const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors({
    origin: ["https://registration-form-mern.vercel.app/"],
    Methods:["GET", "POST", "PUT", "DELETE"],
    Credentials: true
}))

let connectToDatabase = require("./connectDB")
mongoose.set("strictQuery", false);
connectToDatabase();

app.post('/register', (req, res) =>{
    const {fname, lname, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user =>{
        if(user) {
            res.json("Already have an account")
        }else{
            RegisterModel.create({fname: fname, lname : lname,
                email: email , password: password})
            .then(result =>res.json("Account Created Successfully"))
            .catch(error =>res.json(error))
        }
    }).catch(error => res.json(error))
})

app.listen(3001, () => {
    console.log("Server is Running");
})