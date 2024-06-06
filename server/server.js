require("dotenv").config();

const express = require("express"); 
//const cors = require("cors"); 
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");

const app = express(); 
const PORT = 3000; 

const connectDB = require("./connectDB"); 
connectDB(); 

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())

const sessionRouter = require("./routes/sessions"); 
app.use("/api/v1/session", sessionRouter); 

const wordRouter = require("./routes/word"); 
app.use("/api/v1/word", wordRouter); 

app.get("/", (req, res) => {
    res.json({message: "Hello"})
})

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})


