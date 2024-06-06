const User = require("../schemas/User"); 

const users = {}; 

function isValid(username) {
    if (!!username && username.trim() && username.match(/^[A-Za-z0-9_]+$/)) {
        return true; 
    } else {
        return false; 
    }
}

async function userExists(username) {
    try {
        const existingUser = await User.find({ username: username }); 
        return existingUser.length > 0 ? existingUser[0]: null; 

    } catch (err) {
        console.log(err); 
    }
}



function validWord({ username, newWord }) {
    let message = ""; 
    if (!newWord) {
        message = "Username cannot be empty"; 
    }

    if (newWord.length() > 20) {
        message = "Word exceed limit"; 
    }

    if (!message) {
        users[username] = newWord; 
    }

    return message; 
}


module.exports = {
    isValid, 
    userExists,
    validWord, 
}; 