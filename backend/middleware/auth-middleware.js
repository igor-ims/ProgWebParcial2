const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');

const protect = asyncHandler( async (req, res, next) => {
    let token;

    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){
            try {
                // obtener el token
                token = req.headers.authorization.split(' ')[1];
                // verificar la forma del token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // obtener los datos del usuario del payload del token
                // y ponerlo en un objeto
                req.user = await User.findById(decoded.idUsuario).select('-password');    
                next();            
            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error('Acceso no autorizado.');
            }
        }

        if(!token){
            res.status(401);
            throw new Error('Acceso no autorizado, no proporcionaste el token.')
        }
})

module.exports = {
    protect
}