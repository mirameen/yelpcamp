var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
	{
		name: "FusFus vallley",
		image: "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet varius risus, vitae efficitur dui. Donec vehicula ipsum odio, ut pretium leo pretium at. Aenean pulvinar vehicula felis non volutpat. Morbi at risus sit amet tellus egestas rutrum sed eget risus. Aenean laoreet faucibus diam, eu commodo nisi aliquet vel. Maecenas semper augue eu rhoncus ultricies. Ut et imperdiet ex, vel ultrices massa. Cras sollicitudin eros in scelerisque condimentum. Suspendisse turpis purus, vehicula ut mauris at, imperdiet rhoncus mauris. Vestibulum sollicitudin finibus venenatis.Nullam consectetur ex eu molestie semper. Aliquam lorem ex, vulputate aliquam pharetra dignissim, tempus nec lacus. Morbi vulputate, libero vitae gravida feugiat, risus turpis malesuada risus, a condimentum nulla ante vel urna. Nulla nulla nibh, finibus sed varius vitae, lacinia nec erat. Suspendisse dolor libero, tincidunt eget lobortis quis, ornare sed ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec sapien quam, iaculis ac dolor id, ullamcorper auctor tortor. Aenean sem risus, egestas non ultricies eget, aliquet vel massa. Integer a neque dui. Morbi sollicitudin vestibulum velit, id sodales justo facilisis sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed mollis laoreet mauris, vel finibus felis. Pellentesque nec elit sit amet massa sodales elementum. Sed et ligula malesuada, auctor mauris et, pharetra orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
	},
	{
		name: "Ditto Hill",
		image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet varius risus, vitae efficitur dui. Donec vehicula ipsum odio, ut pretium leo pretium at. Aenean pulvinar vehicula felis non volutpat. Morbi at risus sit amet tellus egestas rutrum sed eget risus. Aenean laoreet faucibus diam, eu commodo nisi aliquet vel. Maecenas semper augue eu rhoncus ultricies. Ut et imperdiet ex, vel ultrices massa. Cras sollicitudin eros in scelerisque condimentum. Suspendisse turpis purus, vehicula ut mauris at, imperdiet rhoncus mauris. Vestibulum sollicitudin finibus venenatis.Nullam consectetur ex eu molestie semper. Aliquam lorem ex, vulputate aliquam pharetra dignissim, tempus nec lacus. Morbi vulputate, libero vitae gravida feugiat, risus turpis malesuada risus, a condimentum nulla ante vel urna. Nulla nulla nibh, finibus sed varius vitae, lacinia nec erat. Suspendisse dolor libero, tincidunt eget lobortis quis, ornare sed ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec sapien quam, iaculis ac dolor id, ullamcorper auctor tortor. Aenean sem risus, egestas non ultricies eget, aliquet vel massa. Integer a neque dui. Morbi sollicitudin vestibulum velit, id sodales justo facilisis sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed mollis laoreet mauris, vel finibus felis. Pellentesque nec elit sit amet massa sodales elementum. Sed et ligula malesuada, auctor mauris et, pharetra orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
	},
	{
		name: "Mecha cabin",
		image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet varius risus, vitae efficitur dui. Donec vehicula ipsum odio, ut pretium leo pretium at. Aenean pulvinar vehicula felis non volutpat. Morbi at risus sit amet tellus egestas rutrum sed eget risus. Aenean laoreet faucibus diam, eu commodo nisi aliquet vel. Maecenas semper augue eu rhoncus ultricies. Ut et imperdiet ex, vel ultrices massa. Cras sollicitudin eros in scelerisque condimentum. Suspendisse turpis purus, vehicula ut mauris at, imperdiet rhoncus mauris. Vestibulum sollicitudin finibus venenatis.Nullam consectetur ex eu molestie semper. Aliquam lorem ex, vulputate aliquam pharetra dignissim, tempus nec lacus. Morbi vulputate, libero vitae gravida feugiat, risus turpis malesuada risus, a condimentum nulla ante vel urna. Nulla nulla nibh, finibus sed varius vitae, lacinia nec erat. Suspendisse dolor libero, tincidunt eget lobortis quis, ornare sed ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec sapien quam, iaculis ac dolor id, ullamcorper auctor tortor. Aenean sem risus, egestas non ultricies eget, aliquet vel massa. Integer a neque dui. Morbi sollicitudin vestibulum velit, id sodales justo facilisis sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed mollis laoreet mauris, vel finibus felis. Pellentesque nec elit sit amet massa sodales elementum. Sed et ligula malesuada, auctor mauris et, pharetra orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
	}
];
function seedDB(){
	Campground.deleteMany({},function(err){
		if(err) console.log(err);
		else{
			console.log("removed campgrounds");
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err) console.log(err);
					else{
						console.log("added a campground");
						Comment.create({
							text: "This place is great but i wish it had internet",
							author: "Homer"
						},function(err,comment){
							if(err) console.log(err);
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("new comment created");
							}
						});
					}
				});
			});
		}
	});
}

module.exports=seedDB;