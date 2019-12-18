const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var session = require('express-session')
var cookieParser = require('cookie-parser');

//Mongo database
const mc = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID

var url="mongodb://localhost:27017/"
const app = express();


var dbo;
mc.connect(url, (err, db) =>{
  if(err) throw err;
  console.log('Mongo Connected...');
  dbo = db.db('AP_db');
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: "top secret"}));

app.use('/assets',express.static(__dirname + '/public'));

//homepage
app.get('/',(req, res) => {
  if(req.session.user){
      dbo.collection("product").find({}).toArray(function(err, result){
        console.log(result);
        console.log(req.session.user.role);
        if(req.session.user.role=="seller"){
            res.render('product_view_seller',{
              results: result
            });
        }
        else{
            res.render('product_view',{
              results: result
            });
        }
      });
  }
  else
  {
      res.redirect('/signin');
  }
});

//insert data
app.post('/save',(req, res) => {
  if(!req.session.user){
      res.redirect('/signin')
  }
  var obj;
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {

      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Daud Cheema/Desktop/AP Ass2/public/images/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
     });

     obj = {product_name: fields.product_name, product_price: fields.product_price, description:fields.desc, review:fields.review, category:fields.category, image: files.filetoupload.name};

     dbo.collection("product").insertOne(obj, function(err, res2){
       if(err) throw err;
       res.redirect('/');
     });
  });
});

//update data
app.post('/update',(req, res) => {
    if(!req.session.user){
        res.redirect('/signin')
    }
  var myquery = {_id: new ObjectId(req.body.id)};
  console.log(myquery);
  var newVal = {$set:{ product_name:req.body.product_name, description: req.body.desc, review: req.body.review, category: req.body.category,
      product_price: req.body.product_price }};
  dbo.collection("product").updateOne(myquery, newVal, function(err, res2){
    if(err) throw err;
    res.redirect('/');
  });
});

app.get('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/signin');
})

app.get('/signin', (req, res) => {
    res.render('signin',{
      error: ""
    });
});

app.get('/signup', (req, res) => {
    res.render('signup',{
        error: ""
    });
})

app.post('/processSignin', (req, res) => {
    console.log(req.body.name);
    dbo.collection("users").find({uname:req.body.name, pswd:req.body.pswd}).toArray(function(err, result)
                                                            {
                                                                if (err) throw err;
                                                                console.log(result);
                                                                console.log(result.length)
                                                                var r = result[0].role;
                                                                console.log(r);
                                                                if(result.length>0){
                                                                    req.session.user={id:result.uname, role: r}
                                                                    res.redirect('/');
                                                                }
                                                                else{
                                                                    res.render('signin',{
                                                                      error: "Incorrect username or password"
                                                                    });
                                                                }
                                                            });

});

app.post('/processSignup', (req, res) => {
    dbo.collection("users").find({uname:req.body.name}).toArray(function(err, result)
                                                            {
                                                                if (err) throw err;
                                                                if(result.length>0){
                                                                    res.render('signup',{
                                                                        error: "Username already in use!"
                                                                    });
                                                                }
                                                                else{
                                                                    let obj = {uname: req.body.name, pswd: req.body.pswd, role: req.body.role};
                                                                    req.session.user={id:req.body.name, role:req.body.role}
                                                                    dbo.collection("users").insertOne(obj, function(err, res2){
                                                                      if(err) throw err;
                                                                      res.redirect('/');
                                                                    });
                                                                }
                                                            });

});

//delete data
app.post('/delete',(req, res) => {
    if(!req.session.user){
        res.redirect('/signin')
    }
  dbo.collection("product").remove({_id: ObjectId(req.body.product_id)}, function(err, obj){

    if(err) throw err;
    console.log(req.body.image);
    fs.unlink('C:/Users/Daud Cheema/Desktop/AP Ass2/public/images/'+req.body.image, function (err) {
    });
    res.redirect('/');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
