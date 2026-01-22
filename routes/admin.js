const express = require('express');
const router = express.Router();
const auth_token = require('./token_verify')

router.get('/',auth_token,(req,res,next)=>{
    if(req.user.role == 'admin') return res.render('admin')
    // res.json({msg : 'not admin'})
res.redirect(`/${req.user.role}`)
})
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