require("dotenv").config(); 
const mongoose = require("mongoose"); 

async function connetDB() {
    try{
        await mongoose.connect(process.env.DB_URL); 
        console.log("Connect to mongoDB"); 
    }catch(err) {
        console.log(err); 
    }
}

module.exports = connetDB; 