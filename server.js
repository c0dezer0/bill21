var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var async = require("async");
var randomstring = require("randomstring");
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

fs.readFile('hotels-delhi-formated.json', function(err, data) {
    var hotels = JSON.parse(data);
    MongoClient.connect(config.url, function(err, db){
    	console.log(err);
    	db.collection('hotels').insert(hotels, function(err){
    		console.log("hotels inserted into db");
    	})
    })
})

app.listen(9000, function() {
    console.log("Server running on port : 9000");
})
