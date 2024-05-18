const jwts = require("jwt-simple");
const jwt = require("../services/jwt");
const moment = require("moment");

const SECRET = jwt.SECRET;

const auth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido entrar a la ruta"
        })
    }
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
        const payload = jwts.decode(token, SECRET);
        if(payload.exp <= moment().unix()){
            return res.status(400).json({
                status: "error",
                mensaje: "Token expirado"
            })
        }
        req.user = payload;
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Token invalido"
        })
    }
    next();
}

module.exports = {
    auth
}