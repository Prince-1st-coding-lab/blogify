var express = require('express');
var router = express.Router();
const db = require('./db_connection')
require('dotenv').config()
const {jwt,bcrypt} = require('./encrypt');
const { config } = require('dotenv');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {
    const {email,password} = req.body;
  if(!req.body) return res.status(400).json({msg:'no body data sent to server'});
  
  db.query('select * from users where email=?',[email], async(err,rows)=>{
     if(err) return res.status(400).json({msg:'db failed'})
    const DBuser = rows[0]
    if(rows.length == 0) return res.status(404).json({msg:'no user found'})

    const password_verify = await bcrypt.compare(password,DBuser.password);
    if(!password_verify) return res.status(401).json({msg:'incorect password'})

      //generating token
      const token =  jwt.sign({email:DBuser.email,role:DBuser.role} , process.env.secretKey ,{expiresIn:'1h'});
      res.cookie('token',token,{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        maxAge:2 * 24 * 60 * 60 * 1000
      })
      res.status(200).json({msg:'login success',msg1:200})
      
    
  })
  
});

module.exports = router;
