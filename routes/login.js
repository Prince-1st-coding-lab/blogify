var express = require('express');
var router = express.Router();
const db = require('./db_connection')
const bcrypt = require('./register')

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', function(req, res, next) {
    const {email,password} = req.body;
  if(!req.body) return res.json({msg:'no body data sent to server'});
  
  db.query('select * from users where email=?',[email], async(err,rows)=>{
    const password_verify = await 
  })
  
});

module.exports = router;
