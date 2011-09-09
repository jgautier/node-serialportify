/**
 * @author Julian Gautier
 */

/**
 * Module Dependencies
 */
var express = require('express');
var app = express.createServer();

var browserify = require('browserify');
var dnode = require('dnode');
var serialPortServer = require('serialportify'); 

app.use(express.static(__dirname));
//use browserify to make modules available
app.use(browserify({ require : ['dnode',{'serialport':'serialportify'}]}));

serialPortServer(app);

app.listen(8080);