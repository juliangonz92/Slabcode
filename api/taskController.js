const taskService = require('../core/taskService'); //Import file taskService.js

/**
 * Attach task in project
 */
let attachTask = async (req, res, next) =>
{
    try
    {
        let project = await taskService.attachTask(req.query.idProject, req.body);                
        return res.status(200).send(project);
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}

/**
 * Api that delete task     
 */
let deleteTask = async(req, res, next) =>
{
    try
    {
        await taskService.deleteTask(req.query.idTask);                
        return res.status(200).send({message: 'OK'});
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}

/**
 * Api that register user      
 */
let updateTask = async(req, res, next) =>
{
    try
    {
        await taskService.editTask(req.query.idTask, req.body);                
        return res.status(200).send({message: 'OK'});
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}

let taskComplete = async(req, res, next) =>
{
    try
    {
        await taskService.taskComplete(req.query.idTask);                
        return res.status(200).send({message: 'OK'});
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}



module.exports = {
    attachTask,
    deleteTask,
    updateTask,
    taskComplete
}