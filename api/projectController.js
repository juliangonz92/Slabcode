const projectService = require('../core/projectService'); //Import file projectService.js

/**
 * Api that add project
 */
let addProject = async (req, res, next) =>
{
    try
    {
        let project = await projectService.addProject(req.body);                
        return res.status(200).send(project);
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}

/**
 * Api that delete project     
 */
let deleteProject = async(req, res, next) =>
{
    try
    {
        let idProject = req.query.id;
        await projectService.deleteProject(idProject);                
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
let updateProject = async(req, res, next) =>
{
    try
    {
        let idProject = req.query.id;
        await projectService.updateProject(idProject, req.body);                
        return res.status(200).send({message: 'OK'});
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}

/**
 * Api that complete project      
 */
let projectComplete = async(req, res, next) =>
{
    try
    {
        await projectService.projectComplete(req.query.idProject);                
        return res.status(200).send({message: 'OK'});
    }
    catch(e)
    {
        return res.status(400).send({message: e.message});
    }
}



module.exports = {
    addProject,
    deleteProject,
    updateProject,
    projectComplete
}