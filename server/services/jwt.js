const jwts = require("jwt-simple");
const moment = require("moment");

const SECRET = "tfQRDjU5zlZMUOlDdEy3covNyW6Zpm35";

const generateToken = (user) => {
    const payload = {
        id: user._id,
        nick: user.name,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

    return jwts.encode(payload, SECRET);
}

module.exports = {
    SECRET,
    generateToken
}