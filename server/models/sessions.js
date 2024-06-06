const uuid = require("uuid").v4; 

sessions = {}; 

function addUser(username) {
    const sid = uuid(); 
    sessions[sid] = {username}; 
    return sid; 
}


function getSessionUser(sid) {
    return sessions[sid].username; 
}

function deleteSessionUser(sid) {
    delete sessions[sid]; 
}

function checkSessions() {
    return sessions;
}

module.exports = {
    addUser, 
    getSessionUser, 
    deleteSessionUser, 
    checkSessions,
}