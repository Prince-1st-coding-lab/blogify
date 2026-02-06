const express = require('express');
const router = express.Router();
const auth_token = require('./token_verify')
const db = require('./db_connection')

router.get('/',auth_token,(req,res,next)=>{
    if(req.user.role == 'admin') return res.render('admin')
    // res.json({msg : 'not admin'})
res.redirect(`/${req.user.role}`)
})


/////////////////////////////////////////
router.get('/dashboard',auth_token,(req,res,next)=>{
    if(req.user.role != 'admin') res.redirect(`/${req.user.role}`)
   db.query('select users.* , posts.id,posts.title,posts.status,posts.updated_at,posts.user_id,posts.category from users inner join posts on posts.user_id = users.id  order by updated_at desc',(err,rows)=>{
       if(err) return res.json({msg:err.sqlMessage});
       res.json(rows)})

})
//////////////////////////////

router.post('/post/update',auth_token, function(req, res, next) {
      if(req.user.role != 'admin') return res.json({msg:'you are not admin'});
      if(!req.query) return res.json({msg:'no id provided'});
      const {postId} = req.query;
      const {title,slug,category,status} = req.body;

      db.query('UPDATE posts set title=?,slug=?,category=?,status=? WHERE id = ?',[title,slug,category,status,postId],(err,rows)=>{
    if(err) return res.json({msg:err.sqlMessage});
    res.json({msg:'Post updated'})
   })
      
});
////////////////////////////
router.post('/logout',(req,res)=>{
  res.clearCookie('token',{
    httpOnly:true,
    secure:false,
    sameSite:'strict',
    path:'/',
    maxAge: 0
  })
  res.json({success:true})
})
module.exports = router;