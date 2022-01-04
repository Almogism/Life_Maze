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
//app.set('views', path.join(__dirname));
app.set('view engine', 'html');


//create conection to the data base (db)
const db = mysql.createConnection({
    host : process.env.host,
    user: process.env.user,
    password : process.env.password,
    database : process.env.database
});
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("mysql connected :)");
    }
})

//---------------------------
app.use(express.static('views'));
//------------------------------
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001;
app.listen(PORT, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});/*
app.get('/',(req,res)=>{
    res.render('game');
    
})
*/
//--------- routes
app.get('/',(req,res)=>{
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
            return;
            //help dosent work V
            /*return res.render('signup',{
                messege:'that username is already in use'
            })*/
        }
        //is the password confirm is right
        else if(password !== passwordConfirm)
        {
            console.log('password dosent match');
            return;
            //help dosent work V
            /*
            return res.render('signup',{
                message: 'Password do not match'
            })
            */
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
            /*else{
                console.log(results);
            }*/
        })
        


    })

    res.render('login');

})

//-get into game
app.post('/game',(req,res)=>{
    
    const username = req.body.myusername;
    const password = req.body.password;

    db.query('SELECT password FROM users WHERE userName = ? ',[username],async(error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length==0){
            console.log('wrong user name or paswword');
            res.render('toAdd');
            return;
        }
        const pass = results[0].password;


       if( bcrypt.compareSync(password,pass)){
           console.log('fuck yeah');
           res.render('game');
       }

        
        
    }
    )
    
})