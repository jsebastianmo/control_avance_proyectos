const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");

const register = async (req, res) => {
    //validar campos vacios e incorrectos
    if(req.body.name && req.body.surname && req.body.email && req.body.password){
        const nameValidator = !validator.isEmpty(req.body.name.trim()) && validator.isLength(req.body.name.trim(), {min: 3, max: 35});
        const surnameValidator = !validator.isEmpty(req.body.surname.trim()) && validator.isLength(req.body.surname.trim(), {min: 3, max: 35});
        const emailValidator = !validator.isEmpty(req.body.email.trim()) && validator.isEmail(req.body.email.trim());
        const passwordValidator = !validator.isEmpty(req.body.password.trim()) && validator.isLength(req.body.password.trim(), {min: 3, max: 255});
        if(!nameValidator || !surnameValidator || !emailValidator || !passwordValidator){
            return res.status(400).json({
                status: "error",
                mensaje: "No ha pasado las validaciones de campos"
            })
        }
    }else{
        return res.status(400).json({
            status: "error",
            mensaje: "No ha pasado las validaciones de campos"
        })
    }

    //validar que el nick y el email no están repetidos
    const userValidator = await User.find({email: req.body.email});

    if(userValidator.length >= 1){
        return res.status(400).json({
            status: "error",
            mensaje: "Ya existe un email igual"
        })
    }

    //guardar en la base de datos
    const entidad = new User(req.body);
    entidad.password = await bcrypt.hash(req.body.password, 10);
    const user = await entidad.save();
    return res.status(200).json({
        status: "success",
        user
    })
}

const login = async (req, res) => {
    //validar campos vacios e incorrectos
    if(req.body.password){
        let emailValidator = false;
        const passwordValidator = !validator.isEmpty(req.body.password.trim()) && validator.isLength(req.body.password.trim(), {min: 3, max: 255});
        if(req.body.email){
            emailValidator = !validator.isEmpty(req.body.email.trim()) && validator.isEmail(req.body.email.trim());
            if(!emailValidator || !passwordValidator){
                return res.status(400).json({
                    status: "error",
                    mensaje: "No ha pasado las validaciones de campos"
                })
            }
        }
    }else{
        return res.status(400).json({
            status: "error",
            mensaje: "No ha pasado las validaciones de campos"
        })
    }

    //obtener el usuario
    const user = await User.findOne({ email: req.body.email })

    if(!user){
        return res.status(400).json({
            status: "error",
            mensaje: "Usuario o contraseña incorrecta"
        })
    }else{
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword){
            return res.status(400).json({
                status: "error",
                mensaje: "Usuario o contraseña incorrecta"
            })
        }else{
            const token = jwt.generateToken(user);
            return res.status(200).json({
                status: "success",
                user: {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    compania: user.compania
                },
                token
            })
        }
    }
}

const users = async () => {
    try {
        const users = await User.find();
        if(!users){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido encontrar usuarios"
            })
        }
        return res.status(200).json({
            status: "success",
            users
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

const user = async (req, res) => {
    const { idCompania } = req.params;
    try {
        const user = await User.find({compania: idCompania});
        if(!user){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido encontrar el usuario"
            })
        }
        return res.status(200).json({
            status: "success",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

module.exports = {
    register,
    login,
    users,
    user
}