const express = require("express"); 
const router = express.Router();

const User = require("../schemas/User");
const users = require("../models/users"); 
const sessions = require("../models/sessions"); 
const authenticate = require("./auth"); 


//get username 
router.get("/", (req, res) => {
    const username = authenticate(req, res); 
    if (!username) {
        return; 
    }
    res.status(200).json({ username })
})

router.post("/", async (req, res) => {
    const { username } = req.body; 

    console.log('post', username)

    const sid = sessions.addUser(username); 

    try {
        const userExists = await users.userExists(username); 

        if (userExists) {
            // Set a cookie named 'sid' with the value of the session ID
            res.cookie("sid", sid); 
            return res.status(200).json({ username }); 
        }

        if (!users.isValid(username)) {
            return res.status(401).json({ error: "require-username "}); 
        }

        const newUser = await User.create({ username }); 
        console.log("newUser", username);

        res.cookie("sid", sid); 
        res.status(201).json({ newUser }); 
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}); 


router.delete("/", async (req, res) => {
    const sid = req.cookies.sid;
  
    const username = sid ? sessions.getSessionUser(sid) : "";
  
    if (sid) {
      res.clearCookie("sid");
    }
  
    if (username) {
      sessions.deleteSession(sid);
    }
  
    res.json({ loggedOut: true });
});
  

module.exports = router;