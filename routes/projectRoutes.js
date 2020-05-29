/**
 * Load modules
 */
const express = require('express');
const {verifyToken} = require('../tools/token')

const router = express.Router();

//Load controller
const projectController = require('../api/projectController');

/**
* Routes user link
*/

//Add project
router.post('/project', verifyToken, projectController.addProject);
//Delete project
router.delete('/project', verifyToken, projectController.deleteProject);
//Update project
router.patch('/project', verifyToken, projectController.updateProject);
//Change state completed
router.put('/project', verifyToken, projectController.projectComplete);

module.exports = router;
