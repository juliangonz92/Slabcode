'use strict'

/**
 * Load modules
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Load routes to API REST
const project_routes = require('./routes/projectRoutes');
const task_routes = require('./routes/taskRoutes');
const user_routes = require('./routes/userRoutes');

//Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

//Config CORS
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Config routes to api
app.use('/api', project_routes);
app.use('/api', task_routes);
app.use('/api', user_routes);
app.use('*', (req,res) => res.status(404).json({error: 'Not Found'}));

module.exports = app;