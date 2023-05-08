const express = require('express');

const departmentRouter = require('./departmentRoute.js');
const roleRouter = require('./roleRoute.js');
const employeeRouter = require('./employeeRoute.js');

const app = express();


app.use('/department', departmentRouter);
app.use('/role', roleRouter);
app.use('/employee', employeeRouter);


module.exports = app;