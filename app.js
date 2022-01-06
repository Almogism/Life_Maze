const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
var path = require('path');
const bp = require('body-parser');
const bcrypt = require("bcryptjs");
var cons = require('consolidate');


dotenv.config({path: './.env'});
const app = express();
app.engine('html', cons.swig)
app.set('view engine', 'html');


//create conection to the data base (db)

var db_config = {
    host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database
  };
var db;

function handleDisconnect() {
    db = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

    db.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
/*
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("mysql connected :)");
    }
})
*/
//---------------------------
app.use(express.static('views'));
//------------------------------
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001;
app.listen(PORT, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});

//--------- routes
app.get('/',(req,res)=>{
    res.status(201);
    res.render('firstpage');
})

app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/signUp',(req,res)=>{
    res.render('signUp');
})
app.get('/game',(req,res)=>{
    res.render('game');
})
app.get('/contactdev',(req,res)=>{
    res.render('contactdev');
})
app.get('/recoverPassword',(req,res)=>{
    res.render('recoverPassword');
})
app.get('/toAdd',(req,res)=>{
    res.render('toAdd');
})
//---------- post
// /signup -> login
app.post('/login',(req,res)=>{
    
    console.log(req.body);
    //getting the info from html
    const username = req.body.myusername;
    const name = req.body.name;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const service = req.body.service;
    const genders = req.body.gender;
    //is there already this username
    db.query('SELECT userName FROM users WHERE userName = ?',[username],async (error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length >0){
            
            console.log('that username is already in use');
            res.render('signup3');
            return;
        }
        //is the password confirm is right
        else if(password !== passwordConfirm)
        {
            console.log('password dosent match');
            res.render('signup2');
            return;
        }

        //hash the password
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hashSync(password,salt);

        //insert into db
        
        db.query('INSERT INTO users SET ?',
        {userName : username , Name : name , password : hashedPassword , gender : genders ,service: service },(error,results)=>{
            if(error){
                console.log(error);
            }
            res.render('login');
        })
    })
})


app.post('/switch-level',(req,res)=>{
    const level = req.body.level;
    const money = req.body.money;
    db.query('UPDATE users SET level = ? , money = ? WHERE userName = ?',[level,money,usernamename],async(error,results)=>{
        if(error){
            console.log(error);
        }  
    })
});
//get the level from the db
app.get('/get-first-level', (req, res) => {
    db.query('SELECT level,money FROM users WHERE userName = ? ',[usernamename],async(error,results)=>{
        if(error){
            console.log(error);
        }
        res.send({level : results[0].level, money: results[0].money});
    })
});
var usernamename= undefined;
//-get into game
app.post('/next',(req,res)=>{
    res.status(201);
    const username = req.body.myusername;
    const password = req.body.password;
    if(!username){
        res.render('login2');
        return;
    }
    usernamename =username;
    db.query('SELECT password FROM users WHERE userName = ? ',[username],async(error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length==0){
            console.log('wrong user name or paswword');
            res.render('login2');
            return ;
        }
        const pass = results[0].password;


       if( bcrypt.compareSync(password,pass)){
           res.render('game');
       }
       else{
         res.render('login2');
       }
    }
    )
    
});
module.exports = app;