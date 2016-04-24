var MongoClient = require('mongodb').MongoClient;
var config = require('../../config');
var fs = require('fs');
console.log(config);
module.exports = {
    insert: function(req, res) {
        fs.readFile('database/hotels-delhi-formated.json', function(err, data) {
            if (err) {
                res.send(err);
            } else {
                var hotels = JSON.parse(data);
                MongoClient.connect(config.db_url, function(err, db) {
                    console.log(err);
                    if (err) {
                        res.send(err);
                    } else{
                    	var aa = db.collection('hotels').drop();
                        db.collection('hotels').insert(hotels, function(err) {
                            var h = {};
                            var unique = [];
                            db.collection('hotels').find({}).toArray(function(err, hotels) {
                                var kk = hotels.map(function(hota) {
                                    if (!h[hota.name]) {
                                        h[hota.name] = {}
                                        h[hota.name][hota.establishment_name] = true;
                                        unique.push(hota);
                                    } else if (!h[hota.name][hota.establishment_name]) {
                                        h[hota.name][hota.establishment_name] = true;
                                        unique.push(hota);
                                    }
                                })
                                fs.writeFile('database/restaurant.json', JSON.stringify(unique), function(err){});
                                db.collection('hotelsunique').insert(unique, function(err) {
                                	db.collection('hotelsunique').ensureIndex({location:'2d'}, function(errr){
                                		console.log(errr);
                                		db.close();
                                	});
                                    
                                });
                            });


                            res.send("hotels inserted into db " + err);
                        })
                    }
                })
            }
        })
    },
    health: function(req, res) {
        res.send("Bitch Please!");
    },
    restaurant: function(req, res) {
        var body = req.query;

        if (!body.lat || !body.lng) {
            res.send(response("no lat or lng"));
        } else {
            var page = Number(body.page || '1');
            var type = body.type || 'all';
            var limit = Number(body.limit || '10');

            if (type == 'all') {
                MongoClient.connect(config.db_url, function(err, db) {
                    if (err) { res.send(response(err)); } else {
                        db.collection('hotelsunique')
                            .find({ location: { $near: [Number(body.lng), Number(body.lat)] } })
                            .skip((page - 1) * limit)
                            .limit(limit)
                            .toArray(function(err, result) {
                                db.close();
                                res.send(response(err, result));
                            })
                    }
                })
            } else res.send(response("comming soon"));
            //res.send(success("yeah"));
        }
    }
}

function response(err, body) {
    return { error: err || null, data: body || null };
}
