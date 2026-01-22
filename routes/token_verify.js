// const express = require('express')
const jwt = require('jsonwebtoken');

const auth_token = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token) return res.redirect('/login')
        jwt.verify(token,process.env.secretKey,(err,user)=>{
            if(err) return res.status(403).json({msg:'invalid token provided'})
                req.user = user;
            next();
        })
}

module.exports = auth_token;