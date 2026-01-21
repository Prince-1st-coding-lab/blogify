var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const db = require('./db_connection')
router.use(express.json());

/* GET registration page. */
router.get('/', function(req, res, next) {
  res.render('registration');
});

router.post('/',async function (req, res, next) {
  const {full_name,username,email,password,role} = req.body;
  if(!req.body) return res.json({msg:'no body data sent to server'});
  
  const saltRound = 10;
  const password_hash = await bcrypt.hash(password,saltRound);

  db.query('INSERT INTO users(fullName,username,email,password,role) VALUES (?,?,?,?,?)',[full_name,username,email,password_hash,role], (err,rows)=>{
    if(err) return res.json({msg:err.sqlMessage});
    res.json({msg:'user registered successfully'});
  })

});

module.exports = router;

