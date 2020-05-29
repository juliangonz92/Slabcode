/**
 * Load modules
 */
 const express = require('express');
 
 const router = express.Router();

 //Load controller
 const userController = require('../api/userController');

/**
 * Routes user link
*/

//Add user
router.post('/user', userController.signup);
//Login the user
router.post('/login', userController.login)

module.exports = router;
