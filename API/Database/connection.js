/**
 * Created by ligles on 31/08/16.
 */


var mysql = require('mysql'),
config = require('../Config/config');

module.exports = {



        getConnection: function() {
            return mysql.createConnection({
                host: 'localhost',
                user: config.database.user,
                password: config.database.password,
                database: config.database.name
            });
        }





    }
//con.connect();




