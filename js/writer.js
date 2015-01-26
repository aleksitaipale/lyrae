/*TODO:



Mobiililla pitäis nähä että onko Logged in.


*/
var lyricRefCatalog = [];

//create a reference to firebase
var url = "https://lyriikkaa.firebaseio.com/";
var lyricRef = new Firebase(url);
var authData = lyricRef.getAuth();
/* http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/ */


//var safeColors = ['#3FB8AF', '#7FC7AF', '#FF7473', '#FF9E9D'];
var safeColors = ['#269F96', '#66AE96', '#E65B5A', '#E68584'];

var lastColor = null;
var loginContent= "<input type='text' placeholder='E-mail' id='email' autocomplete='off'><input type='password' placeholder='Password' id='password' autocomplete='off'><input type='button' value='Login' class='loginbutton'>";
var logoutButton = "<input type='button' value='Logout' class='logoutbutton'>";
var rand = function() {
	return Math.floor(Math.random()*(safeColors.length));
};


var randomColor = function() {
	var color = safeColors[rand()];

	if (lastColor !== null){
		while (color === lastColor){
			color = safeColors[rand()];

		}

	}

	lastColor = color;
	
	
	return color;
};

$(document).ready(function() {






//register DOM elements

var artist = $('#artist');
var song = $('#song');
var lyric = $('#lyric');
var lyricList = $("#lyriikkalista");


// Checks whether to show the Submit-sidebar (for desktop & tablet) or the Submit-link (for mobile)

function showSidebar(){
	
	authData = lyricRef.getAuth();

	var mq   = window.matchMedia('only screen and (max-width : 644px)');

	console.log(authData + " authdata");
	if (!mq.matches && authData){
		$("#sidebarback").css('display', 'block');
		$("#sidebar").css('display', 'block');
		$("#mobileLyricSubmit").css('display', 'none');


	} else if (authData && mq.matches) {
		$("#sidebarback").css('display', 'none');
		$("#sidebar").css('display', 'none');
		$("#mobileLyricSubmit").css('display', 'block');

	} else {
		$("#sidebarback").css('display', 'none');
		$("#sidebar").css('display', 'none');
		$("#mobileLyricSubmit").css('display', 'none');


	}

}

$(window).on("resize",function(){
	showSidebar();
	refreshLoginBar();
});


showSidebar();

lyricRef.onAuth(function(authData) {
	var mq = window.matchMedia('only screen and (max-width : 644px)');
	if (authData) {
		$(".deletebutton").css("display","visible");
// user authenticated with Firebase
if (!mq.matches){
	
	$("#login").html("<p style='line-height: normal;'>You are logged in as <b>" + authData.password.email + "</b>!</p>" + "<input style='display:inline;' type='button' value='Logout' class='logoutbutton'>");
}else{
	$("#login").html(logoutButton);

}

showSidebar();

$("#logoutbutton").on( "click", function() {
	lyricRef.unauth();
	$("#login").html(loginContent);
	$(".deletebutton").css("display","none");
});


}

});

$("#sidebar").css('background',randomColor());



function refreshLoginBar(){
	var mq = window.matchMedia('only screen and (max-width : 644px)');

	if (authData){
		$(".deletebutton").css("display","visible");
		if (!mq.matches){
			$("#login").html("<p style='line-height: normal;'>You are logged in as <b>" + authData.password.email + "</b>!</p>" + "<input style='display:inline;' type='button' value='Logout' class='logoutbutton'>");
		} else {
			$("#login").html(logoutButton);
		}

	}

}



function authorize(evt){
	console.log("Logging in...");

	lyricRef.authWithPassword({
		email : $('#email').val(),
		password : $('#password').val()
	}, function(error, authData) {
		if (error){
			$(".loginbutton").notify(
				("Incorrect login!"),
				{className:'error'},
				{arrowShow:false});
		} else if (authData) {
			console.log("Authenticated successfully with payload:", authData);
			showSidebar();
			$(".logoutbutton").notify(
				("Successful login!"),
				{className:'success'},
				{arrowShow:false});
			


		}

		console.log(authData); }, {
			remember: "default"
		});


	showSidebar();
	refreshLoginBar();

	evt.preventDefault();


}

//This takes care that the displayed lyrics will have line breaks if the submitted lyrics had them.
$.valHooks.textarea = {
	get: function( elem ) {
		return elem.value.replace( /\r?\n/g, "\r\n" );
	}
};

//what happens when "SUBMIT" is clicked



function funct1(event){
	var date = Date();
	var artistData = artist.val();
	var songData = song.val();
	var lyricData = lyric.val();
	console.log("New data is being pushed to the database...");
// create a new lyric data

lyricRef.push({Artist: artistData, Song: songData, Lyric: lyricData, Date: date});

event.preventDefault();


}




lyricRef.on('child_added', function(snapshot){

	key                  = snapshot.name(); //Firebase stores the entry under this random string
	value                = snapshot.ref;
	lyricRefCatalog[key] = value;
	//console.log(lyricRefCatalog);

	var data = snapshot.val();
	var artistName = data.Artist;
	var songName = data.Song;
	var lyricName = data.Lyric;
	var theColor = randomColor();

	var lyricBox = $("<div>").addClass("lyriikanpala");
	var artistSongElement = $("<h1>");
	var songElement = $("<span>");
	songElement.text(songName);
	artistSongElement.text(artistName);
	artistSongElement.append(songElement);
	artistSongElement.css('color', theColor);

	var lyricElement = $("<p>");
	lyricElement.text(lyricName);

	var deleteButton = $("<button>");
	deleteButton.addClass("deletebutton");
	deleteButton.text("DELETE");


	lyricBox.append(artistSongElement, lyricElement, deleteButton);
	lyricBox.css('background',theColor);
	lyricList.append(lyricBox);






});



$(document).on("click", ".submitbutton",funct1);
$(document).on("click", ".loginbutton",function(evt){

	var mq = window.matchMedia('only screen and (max-width : 644px)');
	if(mq.matches) {
		window.location.href = "mobileLogin.html";
	} else {
		authorize(evt);
	}


});
$(document).on( "click", ".logoutbutton", function(){
	lyricRef.unauth();
	$("#login").html(loginContent);
	location.reload();
});

});