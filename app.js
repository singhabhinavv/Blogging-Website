
const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");

const _ = require("lodash");

var posts=[];

const homeStartingContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin";

const aboutContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable";

const contactContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res) {
	res.render("home", { homeStartingContent:homeStartingContent, posts: posts});
});

app.get("/about", function(req, res) {
	res.render("about", {aboutContent: aboutContent});
});


app.get("/contact", function(req, res) {
	res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
	res.render("compose");
});

app.post("/compose", function(req, res) {
	const post = {
		title: req.body.postTitle,
		content: req.body.postBody
	};
	posts.push(post);
	res.redirect("/");
});


app.get("/posts/:postName", function(req, res) {
	const searched = _.lowerCase(req.params.postName);
	for(var i=0; i<posts.length; i++) {
		const postTitle = _.lowerCase(posts[i].title);
		if(postTitle === searched) {
			res.render("post", { postTitle: posts[i].title , postContent: posts[i].content});
		}
	}
});




app.listen(3000, function() {
	console.log("Server started on port 3000");
});