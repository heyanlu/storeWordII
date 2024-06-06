const express = require("express"); 
const router = express.Router();

const User = require("../schemas/User"); 
const authenticate = require("./auth");


router.get("/", async (req, res) => {
    const username = authenticate(req, res); 
    if (!username) {
        return; 
    }

    try {
        const user = await User.findOne({ username }); 

        if (user) {
            const storeWord = user.word; 
            //res.json({ storeWord }); 
            res.status(200).json({ storeWord });
        } else {
            res.status(400).json({ error: "user not found" });
        } 
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});


router.patch("/", async (req, res) => {
    const username = authenticate(req, res); 

    if (!username) {
        return; 
    }

    const {newWord} = req.body; 

    console.log("New Word:", newWord)

    try {
        const update = await User.updateOne(
            { username: username }, 
            { $set: { word: newWord }}
        ); 

        if (update.modifiedCount > 0) {
            res.status(200).json({ newWord }); 
        } else {
            res.status(400).json({ error: "user not found"}); 
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;