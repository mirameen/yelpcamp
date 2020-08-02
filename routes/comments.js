var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err) console.log(err);
		else res.render("comments/new",{campground:campground});
	});
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err) console.log(err);
		else{
			Comment.create(req.body.comment,function(err,newComment){
				if(err) console.log(err);
				else{
					newComment.author.id=req.user._id;
					newComment.author.username=req.user.username;
					newComment.save();
					campground.comments.push(newComment);
					campground.save();
					req.flash("success","Successfuly created comment");
					res.redirect("/campgrounds/"+req.params.id);
				}
			});
		}
	});
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err && !campground){
			req.flash("error","Campground not found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id,function(err,comment){
			if(err) res.redirect("back");
			else res.render("comments/edit",{campground_id:req.params.id,comment:comment});
		});
	});
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
		if(err) res.redirect("back");
		else{
			req.flash("success","Successfuly edited comment");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
		if(err) res.redirect("back");
		else{
			req.flash("success","Successfuly deleted comment");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports=router;