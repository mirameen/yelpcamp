var express			=require("express");
var app				=express();
var bodyParser  	=require("body-parser");
var mongoose		=require("mongoose");
var passport		=require("passport");
var LocalStrategy	=require("passport-local");
var Campground  	=require("./models/campground");
var methodOverride  =require("method-override");
var Comment     	=require("./models/comment");
var User 			=require("./models/user");
var seedDB			=require("./seeds");
var flash			=require("connect-flash");
var port			=3000;

var indexRoutes=require("./routes/index");
var campgroundRoutes=require("./routes/campgrounds");
var commentRoutes=require("./routes/comments");

//seedDB();
mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret: "hehehaha",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp server has started");
});