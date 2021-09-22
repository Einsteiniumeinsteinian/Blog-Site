const bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    express = require("express"),
    methodOverride = require('method-override');
sanitizeHtml = require('sanitize-html');
app = express();

mongoose.connect('mongodb://localhost:27017/test_blog_site', { useNewUrlParser: true, useUnifiedTopology: true });

myBlogSchema = mongoose.Schema({
    Title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
})

Blog = mongoose.model("Blog", myBlogSchema)

mongoose.set('useFindAndModify', false)
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")

// Blog.create({
//     Title: "Test Blog",
//     image: "https://cdn.mos.cms.futurecdn.net/Vh6eSp4siwggK7RUys72nP.jpg",
//     body: "The incredulous Ps5 is a work of art!!!"
// }, function(err, blog){
//     if (err) {
//         console.log(err)
//     }else{
//         console.log(blog)
//     }
// })

app.get('/blog', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err)
        } else {
            res.render('index', { blogs: blogs })
        }
    })
})

app.post('/blog', function (req, res) {
    console.log(req.body)
    req.body.blog.body = sanitizeHtml(req.body.blog.body, {
        allowedTags: [],
        allowedAttributes: {}
    })
    console.log("==============================================")
    console.log(req.body)
    Blog.create(req.body.blog, function (err, newPost) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/blog')
        }
    })
})

app.get('/blog/new', function (req, res) {
    res.render('new_post_form')
})

app.get('/blog/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, infoPage) {
        if (err) {
            console.log(err)
            // res.end()
            // res.send(err)
        } else {
            res.render("show", { blog: infoPage })
        }
    })
})

app.get('/blog/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, editBlog) {
        if (err) {

        } else {
            res.render('edit', { blog: editBlog })
        }
    })
})

// update route
app.put('/blog/:id', function (req, res) {
    console.log(req.body)
    req.body.blog.body = sanitizeHtml(req.body.blog.body, {
        allowedTags: [],
        allowedAttributes: {}
    })
    console.log("==============================================")
    console.log(req.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            
        } else {
            res.redirect("/blog/" + req.params.id)
        }
    })
})

app.delete("/blog/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/blog')
        }
    })
})

app.listen(8000, function () {
    console.log('App running at port 8000')
})

