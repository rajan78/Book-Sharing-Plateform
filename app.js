
var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs      = require('ejs')


Schema = new mongoose.Schema({
    bookName : String,
    author : String,
    course:String,
    edition:String,
    createdOn: Date
}),

Book = mongoose.model('Book', Schema);

mongoose.connect('mongodb://project:project@ds013574.mlab.com:13574/rajan_niet_db');


var app = express()

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'));

app.get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
})

app.get('/blogs', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Blog.find({}, function ( err, blogs ){
        if(!err && blogs){
            res.render('blogs.ejs',{
                data :  blogs
            })
        } else {
            console.log(err)
        }
    });
});

app.get('/admin', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Book.find({}, function ( err, book ){
        if(!err && book){
            res.render('admin.ejs',{
                data : book
            })
        } else {
            console.log(err)
        }
    });
});


app.get('/addblog', function(req, res){
    res.render('addPost.ejs')
})

app.get('/', function(req, res){
   Book.find({}).limit(3).exec(function(err, book){
        if(!err && book){
            res.render('index.ejs',{
                data :  book
            })
        } else{
            console.log(err);
            res.status(500).send("something went wrong while fetching blog summary");
        }
    })
})

app.post('/api/addBlog', function (req, res) {
    var book = new Book(
        {
            bookName : req.body.bookName,
            author : req.body.author,
            course : req.body.course,
            edition: req.body.edition,
            createdOn : Date.now()
        }
    );

    // http://mongoosejs.com/docs/api.html#model_Model-save
    blog.save(function (err, data) {
        if(!err && data){
            console.log('Data added successfully');
            res.redirect('/blogs')
        } else {
            res.json(500, {msg: 'Something went wrong' });
            console.log(err)
        }

    });
})

app.get('/api/blogs', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    User.remove({ category: 'music' }, function ( err ) {
        if(!err){
            console.log("User deleted successfully")
        } else{
            console.log(err)
        }
    });
})

app.get('/blog/:id', function(req, res){
   Book.findById( req.params.id, function ( err, book ) {
        if(!err && book){
            res.render('blogDetail.ejs',{
                data : book
            })
        } else {
            console.log(err)
        }
    });
} )

app.get('/editBlog/:id', function(req, res){
    Book.findById( req.params.id, function ( err, book ) {
        if(!err && book){
            res.render('editPost.ejs',{
                data : book
            })
        } else {
            console.log(err)
        }
    });

})

app.post('/api/editBlog/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Book.findById( req.params.id, function ( err, book ) {
            book.bookName = req.body.bookName,
            book.author = req.body.author,
            book.category = req.body.category,
            book.edition  = req.body.edition,
    // http://mongoosejs.com/docs/api.html#model_Model-save
        book.save( function ( err, data ){
            if(!err && data){
                res.redirect('/blogs')
            } else {
                console.log(err)
            }

        });
    });
});

app.get('/api/deleteBlog/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
   Book.findById( req.params.id, function ( err, blog ) {
        // http://mongoosejs.com/docs/api.html#model_Model.remove
       book.remove( function ( err ){
           console.log("Blog deleted successfully")
            res.redirect('/admin')
        });
    });
});

app.listen(1338);
console.log('Magic happens on port 1338');

