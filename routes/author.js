var express = require('express');
var router = express.Router();
const auth_token = require('./token_verify');

/* GET author page. */
router.get('/',auth_token, function(req, res, next) {
      if(req.user.role == 'author') return res.render('author')
    // res.json({msg : 'not author'})
  res.redirect(`/${req.user.role}`)
});

module.exports = router;