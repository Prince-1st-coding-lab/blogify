var express = require('express');
var router = express.Router();
const db = require('./db_connection')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/all/posts', function(req, res, next) {
    db.query('select posts.* , users.fullname from users inner join posts on posts.user_id = users.id  order by updated_at desc',(err,rows)=>{
       if(err) return res.json({msg:err.sqlMessage});
       res.json(rows)
      })
});
router.get('/post/:slug', function(req, res, next) {
  if(!req.params.slug) return res.json({msg:'no post title provided'});

  db.query('select posts.* , users.fullName from users inner join posts on  posts.user_id = users.id where posts.slug=?',[req.params.slug],(err,rows)=>{
       if(err) return res.json({msg:err.sqlMessage});
       const postDATA = rows[0];
       res.render('reader.ejs',{
        title:postDATA.title,
        authorName:postDATA.fullName,
        imageURL:postDATA.featured_image,
        content:postDATA.content,
        time:postDATA.updated_at,
        category:postDATA.category
       })
       
      })
    
});

module.exports = router;
