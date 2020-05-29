const projects = require('../models/project'); //Import model file user.js
const ObjectId = require('mongoose').Types.ObjectId; 

//==================METHODS======================

/**
 * * Method that save a new project in collection 'projects'
 * @param {Object} data - An object request body with data for add project in collection 'projects'
 */
let addProject = async(data) => 
{
    try
    {         
        if(!data.name || data.name.trim().length == 0 || !data.description || data.description.trim().length == 0)
            throw new Error('Data not complete');        
        
        let project = new projects({
            name: data.name,
            description: data.description,
            completed: false
        });   
        await project.save();   
        
        return project
    }        
    catch(e){            
        console.error(`Error ocurred while adding new project, ${e.message}.`)                
        throw new Error(`Error ocurred while adding new project, ${e.message}.`);
    }
}             


/**
 * Delete a project exists 
 * @param {ObjectId} id - ObjectId of the project document to remove
 */
let deleteProject = async(id) =>
{
    try
    {
        await projects.findByIdAndRemove(id)
    }
    catch(e)
    {
        console.error(`Error ocurred while update prject, ${e.message}.`)                
        throw new Error(`Error ocurred while update project, ${e.message}.`);
    }
}

/**
 * Edit a project exists 
 * @param {ObjectId} id - ObjectId of the document project
 * @param {Object} data - An object request body with data for edit project in collection 'projects' 
 */
let updateProject = async(id, data) =>
{
    try
    {
        // //Generate model
        // let project = new projects({
        //     name: data.name,
        //     description: data.description
        // });

        await projects.findByIdAndUpdate(id, data)
    }
    catch(e)
    {
        console.error(`Error ocurred while update prject, ${e.message}.`)                
        throw new Error(`Error ocurred while update project, ${e.message}.`);
    }
}

/**
 * Change state completed
 * @param {ObjectId} idProject -Id Project 
 */
let projectComplete = async(idProject) =>
{
   try
   {
        let completedTasks = await projects.aggregate( [
            {
            '$match': {
                '_id': new ObjectId(idProject)
            }
            }, 
            {
            '$unwind': '$tasks'
            }, 
            {
            '$addFields': {
                'completed_task': '$tasks.completedTask'
            }
            }, 
            {
                '$project': {
                    '_id': 0, 
                    'completed_task': 1
                }
            }
        ]);

        if (!completedTasks.every(v => v.completed_task === true))
            throw new Error('Not all tasks has been completed')

        return projects.update({_id: new ObjectId(idProject)}, {'$set': {completed: true}});
   }
   catch(e)
   {
        console.error(`${e.message}`)                
        throw new Error(`${e.message}`);
   }
}


module.exports = {
    addProject,
    deleteProject,
    updateProject,
    projectComplete
}