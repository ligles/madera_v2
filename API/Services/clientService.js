/**
 * Created by ligles on 01/09/16.
 */
var mysql = require('mysql'),
connect = require('../Database/connection.js'),
config = require('../Config/config');
module.exports = {



    getById:function(req,res){



        findClientById(req.params.id,function(client){

            var client = client[0];
            if(!client){

                res.json({"Error" : true, "Message" : "Client non trouvé " });

            }else{
                res.json({"Error": false,"Message" : "Success", "Client":client})

            }
        });

    },
    save:function(req,res){
        //console.log("test " +JSON.parse(JSON.stringify((req.body.password))));
        var input = JSON.parse(JSON.stringify((req.body)));
        var client = {
            email : input.email,
            first_name : input.prenom,
            last_name : input.nom,
            address_1 : input.addresse,
            address_2 : input.addresse2,
            city : input.ville,
            zip_code : input.code_postal,
            country : input.pays,
            phone : input.telephone,
            birth_date : input.date_naissance


        }

        var con = connect.getConnection();
        con.connect();
        var sql = "INSERT INTO ??(??,??) VALUES (?,?)"
        var inserts = ['user','email','first_name','last_name','address_1','address_2','city','zip_code','country','phone','birth_date',
            ,client.input.email,client.input.prenom,client.input.nom,client.input.addresse,client.input.addresse2,client.input.ville,client.input.code_postal,client.input.pays,
            client.input.telephone,client.input.date_naissance];

        sql = mysql.format(sql,inserts);



        var query = con.query(sql,function(err, rows){
            if(err){
                console.log("error pendant l'insertion du client. Erreur = %s ", err);
                console.log("query = %s", query.sql);
                res.json({"Error" : true, "Message" : "Error executing Mysql query"});

            }else{
                res.json({"Error" : false, "Message" : "CLient ajouté! " });
            }

           // res.status(200);
        });

        con.end();

    },

    put:function(req,res){
        var input = JSON.parse(JSON.stringify((req.body)));

        var client = {
            email : input.email,
            first_name : input.prenom,
            last_name : input.nom,
            address_1 : input.addresse,
            address_2 : input.addresse2,
            city : input.ville,
            zip_code : input.code_postal,
            country : input.pays,
            phone : input.telephone,
            birth_date : input.date_naissance


        }

        var con = connect.getConnection();
        con.connect();
        var sql = "UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? WHERE ?? = ?"
        var update = ['Client','email',client.input.email,'first_name',client.input.prenom,'last_name',client.input.nom,'address_1',client.input.addresse,'address_2',client.input.addresse2,'city',client.input.ville,client.input.code_postal,client.input.pays,
            client.input.telephone,client.input.date_naissance];
        sql = mysql.format(sql,update);



        var query = con.query(sql,function(err, rows){
            if(err){
                console.log("error pendant l'update de l'utilisateur. Erreur = %s ", err);
                console.log("query = %s", query.sql);
                res.json({"Error" : true, "Message" : "Error executing Mysql query"});

            }else{
                res.json({"Error" : false, "Message" : "Utilisateur mis à jour! " });
            }

            // res.status(200);
        });

        con.end();



    },

    login:function(req,res){

        var input = JSON.parse(JSON.stringify((req.body)));

        findUserByMail(input.email,function(users){
           console.log(users[0]);
            var user = users[0];
            if(!user){

                res.json({"Error" : true, "Message" : "Utilisateur non trouvé " });

            }else{
                console.log(input.password +"   "+user.user_password);
                if(user.user_password != input.password){
                    res.json({"Error" : true, "Message" : "Mot de passe incorrect " });
                }else{


                    var token = jwt.sign({email:input.email},config.secret,{
                        expiresIn:config.token_validity

                        });
                    res.json({
                        success : true,
                        message : 'Un petit Token',
                        token: token
                    })
                }

            }
        });

    },

    VerifyToken:function(req,res,next){

            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if(token){

                jwt.verify(token,config.secret, function(err,decoded){
                    if(err){
                        return res.json({success:false, message: 'Le token est invalide'})
                    }else{

                        req.decoded = decoded;
                        next();
                    }
                });

            }else{
                console.log("pas de token");
            }
    }

};

function findUserByMail(mail,callback){


    var con = connect.getConnection();
    con.connect();
    var sql = "SELECT * FROM ?? WHERE ?? = ?"
    var inserts = ['user','user_email',mail];
    sql = mysql.format(sql,inserts);

    var query = con.query(sql,function(err, rows){
        if(err){
            console.log("error lors de la recherche de l'utilisateur. Erreur = %s ", err);
            console.log("query = %s", query.sql);
            res.json({"Error" : true, "Message" : "Error executing Mysql query"});

        }else{
            // console.log(rows);
            callback(rows)
            //res.json({"Error" : false, "Message" : "Utilisateur ajouté! " });
        }

        // res.status(200);
    });

    con.end();

}
function findUserById(id,callback){

    var con = connect.getConnection();
    con.connect();
    var sql = "SELECT user_id,user_email,user_join_date FROM ?? WHERE ?? = ?"
    var inserts = ['user','user_id',id];
    sql = mysql.format(sql,inserts);

    var query = con.query(sql,function(err, rows){
        if(err){
            console.log("error lors de la recherche de l'utilisateur. Erreur = %s ", err);
            console.log("query = %s", query.sql);
            res.json({"Error" : true, "Message" : "Error executing Mysql query"});

        }else{
            // console.log(rows);
           // console.log("query = %s", query.sql);
            callback(rows)
            //res.json({"Error" : false, "Message" : "Utilisateur ajouté! " });
        }

        // res.status(200);
    });

    con.end();

}