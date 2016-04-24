var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var async = require("async");
var randomstring = require("randomstring");
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

app.use(bodyParser.json());
app.listen(config.port, config.ip_address, function() {
    console.log("Server running on port : 9000");
})

require('./server/routes')(app);