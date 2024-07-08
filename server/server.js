require("dotenv").config();

const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");

const app = express(); 
const PORT = 3000; 
const path = require('path')

const connectDB = require("./connectDB"); 
connectDB(); 

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/dist");

app.use(express.static(buildPath));
app.use(cors());

app.get("/", function(req, res) {
    res.sendFile(
        path.join(_dirname, "../client/build/index.html"),
        function(err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())

const sessionRouter = require("./routes/sessions"); 
app.use("/api/v1/session", sessionRouter); 


const wordRouter = require("./routes/word"); 
app.use("/api/v1/word", wordRouter); 

// app.get("/", (req, res) => {
//     res.json({message: "Hello"})
// })
app.get("/hello", (req, res) => {
    res.json({message: "Hello"});
});


app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
})


