var controllers = require('../controllers');
var api = controllers.api;

module.exports = function(app) {
    app.route('/insert')
    .get(api.insert);

    app.route('/health')
    .get(api.health);

    app.route('/api/restaurant')
    .get(api.restaurant);
    
};
