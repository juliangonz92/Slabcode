const projects = require('../models/project'); //Import model file user.js
const ObjectId = require('mongoose').Types.ObjectId; 

//==================METHODS======================

/**
 * Method that attach a new task in collection 'projects'
 * @param {ObjectId} idProject - id Project
 * @param {Object} data - An object request body with data for attach task in collection 'projects'
 */
let attachTask = async(idProject, data) => 
{
    try
    {         
        if(!data.nameTask || data.nameTask.trim().length == 0)
            throw new Error('Data not complete');   
        
        let project = await projects.findById(idProject);
        project.tasks.push(data);
        project.save();
        // let project = new projects(data);   
        // await project.save();   
        
        return project;
    }        
    catch(e){            
        console.error(`Error ocurred while attachin task, ${e.message}.`)                
        throw new Error(`Error ocurred while adding task, ${e.message}.`);
    }
}             


/**
 * Delete a project exists 
 * @param {ObjectId} id - ObjectId of the project document to remove
 */
let deleteTask = async(id) =>
{
    try
    {
        return await projects.update({},{
            '$pull': {"tasks": {"_id": new ObjectId(id)}}
        })
    }
    catch(e)
    {
        console.error(`Error ocurred while update prject, ${e.message}.`)                
        throw new Error(`Error ocurred while update project, ${e.message}.`);
    }
}

/**
 * Edit a project exists 
 * @param {ObjectId} idProject - ObjectId of the project document
 * @param {ObjectId} idTask - ObjectId of the task document
 * @param {Object} data - An object request body with data for edit project in collection 'projects' 
 */
let updateTask = async(idProject, idTask, data) =>
{
    try
    {
        return await projects.update({
            _id: idProject,
            "tasks._id": new ObjectId(idTask)
        },
        {
            $set: {
                "tasks.$.nameTask": data.nameTask,
                "tasks.$.descriptionTask": data.descriptionTask,
                "tasks.$.completedTask": data.completedTask,
            }
        })
    }
    catch(e)
    {
        console.error(`Error ocurred while update prject, ${e.message}.`)                
        throw new Error(`Error ocurred while update project, ${e.message}.`);
    }
}

let getProjectByIdTask = async(idTask) =>
{
    let project = await projects.aggregate([
        {
          '$unwind': '$tasks'
        }, 
        {
          '$addFields': {
            'id_project': '$_id', 
            'id_task': '$tasks._id', 
            'name_task': '$tasks.nameTask', 
            'description_task': '$tasks.descriptionTask', 
            'completed': '$tasks.completedTask'
          }
        }, {
          '$match': {
            'id_task': new ObjectId(idTask)
          }
        },
        {
          '$project': {
            'id_project': 1, 
            '_id': 0, 
            'name_task': 1, 
            'description_task': 1, 
            'completed': 1
          }
        }
    ]);

    return project[0];
}

let editTask = async(idTask, data) =>
{
    let project = await getProjectByIdTask(idTask);
    let task = {
        nameTask: data.nameTask,
        descriptionTask: data.descriptionTask,    
        completedTask: project.completed,
    }
    return updateTask(project.id_project, idTask, task);
}


let taskComplete = async(idTask) =>
{
    let project = await getProjectByIdTask(idTask);
    let task = {
        nameTask: project.name_task,
        descriptionTask: project.description_task,
        completedTask: true
    }
    return updateTask(project.id_project, idTask, task);
}


module.exports = {
    attachTask,
    deleteTask,
    editTask,
    taskComplete
}