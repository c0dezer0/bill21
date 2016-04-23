var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var async = require("async");
var randomstring = require("randomstring");

fs.readFile('hotels-delhi-all.json', function(err, data) {
    var hotels = JSON.parse(data);
    console.log(hotels.length);
    var new_hotels = hotels.map(function(hotel) {
        hotel.res_id = randomstring.generate(10);
        hotel.location = [hotel.lon, hotel.lat];
        return hotel;
    })
    fs.writeFile('hotels-delhi-formated.json', JSON.stringify(new_hotels), function(err) {
        console.log(err);
    })
})

app.listen(9000, function() {
    console.log("Server running on port : 9000");
})
