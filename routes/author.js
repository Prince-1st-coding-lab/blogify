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
    db.query('select id,title,status,updated_at,user_id from posts where user_id=? order by updated_at desc',[req.user.id],(err,rows)=>{
       if(err) return res.json({msg:err.sqlMessage});
       res.json(rows)
  })
});
////////////////////////////////////////////////////////
router.get('/delete',auth_token, function(req, res, next) {
      if(req.user.role != 'author') return res.json({msg:'you are not author'});
      if(!req.query) return res.json({msg:'no id provided'});
      const {id} = req.query;
      db.query('DELETE FROM posts WHERE posts.id = ?',[id],(err,rows)=>{
    if(err) return res.json({msg:err.sqlMessage});
    res.json({msg:'Post deleted'})
   })
      
});
////////////////////////////////////////////////////////
router.post('/update',auth_token, function(req, res, next) {
      if(req.user.role != 'author') return res.json({msg:'you are not author'});
      if(!req.query) return res.json({msg:'no id provided'});
      const {postId} = req.query;
      const {title,slug,content,image,category,status} = req.body;

      db.query('UPDATE posts set title=?,slug=?,content=?,featured_image=?,category=?,status=? WHERE posts.id = ?',[title,slug,content,image,category,status,postId],(err,rows)=>{
    if(err) return res.json({msg:err.sqlMessage});
    res.json({msg:'Post updated'})
   })
      
});
router.get('/all/update',auth_token, function(req, res, next) {
      if(req.user.role != 'author') return res.json({msg:'you are not author'});
      if(!req.query) return res.json({msg:'no id provided'});
      const {postId} = req.query;

      db.query('select * from posts WHERE id = ?',[postId],(err,rows)=>{
    if(err) return res.json({msg:err.sqlMessage});
    res.json(rows)
   })
      
});

////////////////////////////////////////////////////////////
router.post('/new/post',auth_token,function(req,res,next){
  if(req.user.role != 'author') return res.json({msg:'you are not author'})
   const {post_title,slug,post_image,post_category,editor,status} = req.body;

   if (!req.body) return res.status(404).json({msg:'no data sent'});
   
   db.query('INSERT INTO posts (user_id, title,slug,content,featured_image,category,status) VALUES (?,?,?,?,?,?,?)',[req.user.id,post_title,slug,editor,post_image,post_category,status],(err,rows)=>{
    if(err) return res.json({msg:err.sqlMessage});
    res.json({msg:'new post published'})
   })
   
})


module.exports = router;