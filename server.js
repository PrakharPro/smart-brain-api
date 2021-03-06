const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
//const bcrypt = require('bcrypt');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const findface = require('./controllers/findface');
const profile = require('./controllers/profileId');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true,
  }
});

app.use(cors());

app.use(bodyParser.json());

app.get('/',(req,res)=>{res.send('it is working!')});

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db)} );

app.post('/findface',(req,res)=>{findface.handleFindface(req,res,db)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,db)})

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)} )

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${process.env.PORT}`))