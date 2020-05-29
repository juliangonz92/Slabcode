const bcrypt = require('bcryptjs');
const users = require('../models/user'); //Import model file user.js
const token = require('../tools/token'); //Import file to management tokens


//==================METHODS======================

/**
 * Method that save a new user in collection 'users' in database
 * @param {Object} data - An object request body with data for add user in collection 'users'
 */
let addUser = async(data) => 
{
    try
    {         
        if(!data.password || data.password.trim().length == 0)
            throw new Error('Password is necessary');        
        
        let user = new users({
            password: bcrypt.hashSync(data.password, 10),
            email: data.email,
        });   
        
        await user.save();      
    }        
    catch(e){            
        console.error(`Error ocurred while adding new user, ${e.message}.`)                
        throw new Error(`Error ocurred while adding new user, ${e.message}.`);
    }
}

/**
 * Login user
 * @param {Object} data - An object request body {email: '', password : ''}
 */
let login = async(data) =>
{
    try
    {
        let user = await users.findOne( { email: data.email }, { _id: 0, email: 1, password: 1});
        if(user == null)
            throw new Error('Email or password not exists.');
        else
        {
            let isMatch = await bcrypt.compare(data.password, user.password);
            if(!isMatch)
                throw new Error('Email or password not exists.');
            else
            {
                let jwt = await token.generateToken(user.email);
                let response = { token: jwt }
                return response;
            }
        }
    }
    catch(e)
    {
        console.error(`${e.message}`)                
        throw new Error(`${e.message}`);
    }
}

module.exports = {
    addUser,
    login
}