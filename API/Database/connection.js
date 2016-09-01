/**
 * Created by ligles on 31/08/16.
 */


var mysql = require('mysql');

module.exports = {



        getConnection: function() {
            return mysql.createConnection({
                host: 'localhost',
                user: 'maderaDbUser',
                password: 'maderaPass',
                database: 'APIMadera'
            });
        }





    }
//con.connect();




