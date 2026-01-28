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
   db.query('select posts.* , users.fullName from posts inner join users on posts.user_id = users.id order by updated_at desc',(err,rows)=>{
       if(err) return res.json({msg:err.sqlMessage});
       res.json(rows)})

})
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