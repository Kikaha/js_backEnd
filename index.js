const env = process.env.NODE_ENV || 'development';
global.__basedir = __dirname;

// const cubeModel = require('../workshop/models/cube')
// cubeModel.insert({name:"test1",description:"test3"})
// .then(insertedCube =>{
//     console.log(insertedCube);
//     return cubeModel.delete(insertedCube);
// }).then(()=>{
//     console.log("LastIndex should be 1, and we must not have any cubes");
// })

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));