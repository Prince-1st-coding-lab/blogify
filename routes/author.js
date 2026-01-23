var express = require('express');
var router = express.Router();
const auth_token = require('./token_verify');
const db = require('./db_connection')

/* GET author page. */
router.get('/',auth_token, function(req, res, next) {
      if(req.user.role == 'author') return res.render('author')
  res.redirect(`/${req.user.role}`) 
});

///////////////////////////////////////////////////////////////////

/* GET all author page. */
router.get('/all',auth_token, function(req, res, next) {
   if(req.user.role != 'author') return res.json({msg:'you are not author'})
    db.query('select title,status,updated_at,user_id from posts',(err,rows)=>{
       if(err) return res.json({msg:err.sqlMessage});
       res.json(rows)
  })
});

////////////////////////////////////////////////////////////
router.post('/new/post',auth_token,function(req,res,next){
  if(req.user.role != 'author') return res.json({msg:'you are not author'})
   const {post_title,slug,post_image,post_category,editor} = req.body;

   if (!req.body) return res.status(404).json({msg:'no data sent'});
   
   db.query('INSERT INTO posts (user_id, title,slug,content,featured_image,category) VALUES (?,?,?,?,?,?)',[req.user.id,post_title,slug,editor,post_image,post_category],(err,rows)=>{
    if(err) return res.json({msg:err.sqlMessage});
    res.json({msg:'new post published'})
   })
   
})


module.exports = router;