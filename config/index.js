var connection_string = '127.0.0.1:27017/bill21';
// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var url = 'mongodb://' + connection_string;

module.exports = {
    db_url: url,
    port: process.env.OPENSHIFT_NODEJS_PORT || "9000",
    ip_address : process.env.OPENSHIFT_NODEJS_IP || 'localhost'
 
}
