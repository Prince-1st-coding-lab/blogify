var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const db = require('./db_connection')

/* GET registration page. */
router.get('/', function(req, res, next) {
  res.render('registration');
});

router.post('/', function(req, res, next) {
  const {full_name,username,email,password,role} = req.body;
  db.query('INSERT INTO users(fullName,username,email,password,role) VALUES (?,?,?,?,?)',[full_name,username,email,password,role],(err,rows)=>{
    if(err) return res.send(err);
    res.send(rows);
  })

});

module.exports = router;

