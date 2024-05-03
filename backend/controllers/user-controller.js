const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');

const register = asyncHandler( async (req, res) => {
    // desestructurar un objeto
    const {name, email, password} = req.body;
    // verificar que me pasan los datos
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Faltan datos para registrar un usuario');
    }
    // verificar si existe el email (unico)
    const userExistente = await User.findOne({email});
    if(userExistente){
        res.status(400);
        throw new Error('Este email ya está asignado a un Usuario.');
    }
    // Hacer el hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Crear usuario
    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    res.status(201).json({
        message : 'Crear usuario',
        user
    })
})

const login = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            message : 'Login usuario',
            id : user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user.id)
        })
    }
    else{
        res.status(401);
        throw new Error('Credenciales incorrectas.');
    }
})

const generateToken = (idUsuario) => {
    return jwt.sign({idUsuario}, process.env.JWT_SECRET, {expiresIn : '30s'});
}

const showData = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    register,
    login,
    showData
}