//load modules
const jwt = require('jsonwebtoken');
require('dotenv/config'); //Import library for manage enviroments

//Const token
const secret = process.env.SECRET_TOKEN;


//==================METHODS======================

/**
 * Generate a jwt and encrypt email
 * @param {String} email -Email user 
 */
let generateToken = async(email) =>
{
    try
    {
        let token =jwt.sign({
            email : email,
        }, secret);
    
        return token;
    }
    catch(e)
    {
        console.error(`Error ocurred while generate token, ${e.message}.`)                
        throw new Error(`Error ocurred while generate token, ${e.message}.`);
    }
}

/**
 * Method that decoded a jwt and return the email user
 * @param {Object} req -Object Request in http method REST
 */
let getEmailByToken = (req) =>
{
    try
    {
        let token = req.get('Authorization');
        let decoded = jwt.decode(token);
        return decoded.email;
    }    
    catch(e)
    {
        console.error(`Error ocurred while decoded token, ${e.message}.`)                
        throw new Error(`Error ocurred while decoded token, ${e.message}.`);
    }
}


/**
 * Method that verify if jwt token is valid
 * @param {Object} req -Object Request in http method REST
 * @param {Object} res  -Oject Response in http REST
 * @param {Object} next 
 */
let verifyToken = (req, res, next) =>
{
    let token = req.get('Authorization');
    jwt.verify(token, secret, (err, decoded) => {
        if(err)
            return res.status(401).json({err : err.message});        
        next();
    })
}

module.exports = {
    generateToken,
    getEmailByToken,
    verifyToken
}