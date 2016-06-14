
var express  = require('express'),
   mongoose = require('mongoose'),
   bodyParser = require('body-parser'),
    ejs      = require('ejs')

    // Mongoose Schema definition
    Schema = new mongoose.Schema({
            firstName    : String,
                bookName : String,
                    authorName : String,
                        bookStatus :String,
                            contactNo :String,
                                    email :String
    }),         

    User = mongoose.model('User', Schema);

    mongoose.connect('mongodb://rajan78:Rajan7895@ds013574.mlab.com:13574/rajan_niet_db');

    var app = express()
    
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({extended: true}));
 

  app.get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

app.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    User.find({}, function ( err, users ){
        if(!err && users){
            res.render('users.ejs',{
                data :  users
            })
        } else {
            console.log(err)
        }
    });

});
app.get('/adduser',function(req,res){
    res.render('addUser.ejs')
});

  app.post('/api/adduser', function (req, res) {
        var user = new User(
        {
            firstName : req.body.firstName,
            bookName : req.body.bookName,
            authorName : req.body.authorName,
            bookStatus : req.body.bookStatus,
            contactNo :req.body.contactNo,
            email :req.body.email
        
        }
    
  
    // http://mongoosejs.com/docs/api.html#model_Model-save
    user.save(function (err, data) {
        if(!err && data){
            console.log('Success');
            res.redirect('/')
        } else {
            console.log(err)
        }
      
    });
  });


app.get('/adduser',function(req,res){
    res.render('addUser.ejs')
});

  app.delete('/api/users', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    User.remove({ isPassedOut: true }, function ( err ) {
        if(!err){
            console.log("User deleted successfully")
        } else{
            console.log(err)
        }
    });
  })

  app.get('/userdetails/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
        if(!err && user){
            res.render('userDetail.ejs',{
                data:user
            })
        } else {
            console.log(err)
        }
    });
  })

  app.put('/api/users/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      user.isPassedOut = req.body.completed;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      user.save( function ( err, data ){
          if(!err && data){
           res.status(200).json(data)
          } else {
              console.log(err)
          }
       
      });
    });
  });

  app.delete('/api/users/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      user.remove( function ( err ){
           res.status(200, {msg: 'User deleted'})
      });
    });
  })

app.listen(1338);
console.log('Magic happens on port 1338');

