/**
 * Created by ligles on 01/09/16.
 */
var mysql = require('mysql');
connect = require('../Database/connection.js');
module.exports = {





    save:function(req,res){
        //console.log("test " +JSON.parse(JSON.stringify((req.body.password))));
       var input = JSON.parse(JSON.stringify((req.body)));
        console.log(input.email);
        var user = {

            user_email : input.email,
            user_password : input.password


        }

        var con = connect.getConnection();
        con.connect();
        var sql = "INSERT INTO ??(??,??) VALUES (?,?)"
        var inserts = ['user','user_email','user_password',user.user_email,user.user_password];
        sql = mysql.format(sql,inserts);



        var query = con.query(sql,function(err, rows){
            if(err){
                console.log("error pendant l'insertion de l'utilisateur. Erreur = %s ", err);
                console.log("query = %s", query.sql);
                res.json({"Error" : true, "Message" : "Error executing Mysql query"});

            }else{
                res.json({"Error" : false, "Message" : "Utilisateur ajouté! " });
            }

           // res.status(200);
        });

        con.end();

    }



}