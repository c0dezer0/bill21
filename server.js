var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var async = require("async");
var randomstring = require("randomstring");
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

app.get('/insert', function(req, res) {
    fs.readFile('database/hotels-delhi-formated.json', function(err, data) {
        var hotels = JSON.parse(data);
        MongoClient.connect(config.db_url, function(err, db) {
            console.log(err);
            db.collection('hotels').insert(hotels, function(err) {
            	db.close();
                res.send("hotels inserted into db");
            })
        })
    })
})
app.get('/', function(req, res){
	res.send("Bitch Please!");
})

app.listen(config.port,config.ip_address, function() {
    console.log("Server running on port : 9000");
})
