var express = require('express');
var router = express.Router();
const db = require('./db_connection')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/all/posts', function(req, res, next) {
    db.query('select id,title,status,updated_at,user_id from posts order by updated_at desc',(err,rows)=>{
       if(err) return res.json({msg:err.sqlMessage});
       res.json(rows)
      })
});

module.exports = router;
