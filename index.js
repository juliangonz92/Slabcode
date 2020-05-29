'use strict'

/**
 * Load modules
 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * Load file express config
 */
const app = require('./app');
const port = process.env.PORT || 3800;

/**
 * Connect to mongo database
 */
mongoose.connect(
    process.env.SLB_DB_ATLAS,
    { useNewUrlParser: true }
).then(async client => {
    console.log(`La conexion a MongoDB se ha realizado correctamente`);
    app.listen(port, () => {
        console.log(`listening app on port ${port}`);
    });
})
.catch(err => {
    console.log(err.stack);
    process.exit(1);
});