const express = require('express');
const router = express.Router();
const auth_token = require('./token_verify')

router.get('/',auth_token,(req,res,next)=>{
    res.render('admin')
    // res.json({msg : req.user})
})
module.exports = router;