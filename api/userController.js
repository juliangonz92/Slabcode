const userService = require('../core/userService'); //Import file userService.js

/**
 * Api that login user
 */
let login = async (req, res, next) =>
{
    try
    {
        let token = await userService.login(req.body);                
        return res.status(200).send(token);
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}

/**
 * Api that register user      
 */
let signup = async(req, res, next) =>
{
    try
    {
        await userService.addUser(req.body);                
        return res.status(200).send({message: 'OK'});
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}

module.exports = {
    login,
    signup
}