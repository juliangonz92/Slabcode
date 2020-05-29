/**
 * Load modules
 */
const express = require('express');
const {verifyToken} = require('../tools/token')

const router = express.Router();

//Load controller
const taskController = require('../api/taskController');

/**
* Routes user link
*/

//Add project
router.post('/task', verifyToken, taskController.attachTask);
//Delete project
router.delete('/task', verifyToken, taskController.deleteTask);
//Update project
router.patch('/task', verifyToken, taskController.updateTask);
//Change state completed
router.put('/task', verifyToken, taskController.taskComplete);

module.exports = router;
