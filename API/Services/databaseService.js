/**
 * Created by ligles on 02/09/16.
 */
var mysql = require('mysql'),
    connect = require('../Database/connection.js'),
    async = require('async'),
    config = require('../Config/config');;

module.exports = {





    init : function(req,res){

        var con = connect.getConnection();

        con.connect(

            function(err){
                if(err){
                    afterExecution('Error: ', 'not a success !', res);

                }else{

                    async.parallel([
                        function(next) {
                            con.query('CREATE TABLE IF NOT EXISTS '+ config.database.name +'.client (' +
                                'id INT(70) NOT NULL AUTO_INCREMENT,' +
                                'email varchar(45) NOT NULL,' +
                                'first_name varchar(45) NOT NULL,' +
                                'last_name varchar(45) NOT NULL,' +
                                'address_1 varchar(45) NULL,' +
                                'address_2 varchar(45) NULL,' +
                                'city varchar(45) NULL,' +
                                'zip_code varchar(5) NULL,' +
                                'country varchar(45) NULL,' +
                                'phone int(10) NULL,' +
                                'birth_date TIMESTAMP NULL,' +
                                'last_update_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,' +
                                'PRIMARY KEY (id),UNIQUE INDEX `email_UNIQUE` (`email` ASC))ENGINE = InnoDB;',
                                next);
                        } ,/*
                        function(next) {
                            client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.projects (' +
                                'id_project uuid,'+
                                'id int,' +
                                'first_name varchar,' +
                                'last_name varchar,' +
                                'id_client int,' +
                                'project_name varchar,' +
                                'date varchar,' +
                                'status varchar,'+
                                'last_update_time timeuuid,' +
                                'insert_time timeuuid,' +
                                'PRIMARY KEY ((id_project),id,project_name)' +
                                ')WITH CLUSTERING ORDER BY (id DESC);',
                                next);
                        },
                        function(next) {
                            client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.orders (' +
                                'id_order uuid,' +
                                'id varchar,' +
                                'client_id varchar,' +
                                'client_first_name varchar,' +
                                'date_of_issue varchar,' +
                                'date_of_dispatch varchar,' +
                                'date_of_reception varchar,' +
                                'status_order varchar,' +
                                'PRIMARY KEY (id_order)' +
                                ');',
                                next);
                        },function(next) {
                            client.execute('CREATE TABLE IF NOT EXISTS '+ config.bdd.keyspace+'.quotations (' +
                                'id_quotation uuid,' +
                                'id int,' +
                                'id_project int,' +
                                'project_name varchar,' +
                                'first_name varchar,' +
                                'last_name varchar,' +
                                'date varchar,' +
                                'reference int,' +

                                'status varchar,' +
                                'amounts varchar,' +
                                'last_update_time timeuuid,' +
                                'insert_time timeuuid,' +
                                'PRIMARY KEY ((id_quotation),id,reference)' +
                                ')WITH CLUSTERING ORDER BY (id DESC);',
                                next);
                        }*/
                    ], afterExecution('Error: ', 'Tables created.' , res),function(){ con.end()});

                }

            }


        );
    },
    drop : function(req,res) {


        var con = connect.getConnection();

        con.connect(
            function (err) {
                if (err) {
                    afterExecution('Error: ', 'not a success !', res);

                } else {

                    async.parallel([
                        function (next) {
                            con.query('DROP TABLE IF EXISTS client',
                                next);
                        }
                    ], afterExecution('Error: ', 'Tables droped.', res), function () {
                        con.end()
                    });

                }

            }
        )

    }
};



function afterExecution( errorMessage, successMessage, res) {
    return function(err) {


        if (err) {
            console.log(err);
            return res.json(errorMessage);
        } else {
            console.log(successMessage);
            res.json(successMessage);
        }
    }
}