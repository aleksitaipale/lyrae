var safeColors = ['00','33','66','99','cc','ff'];
var rand = function() {
	return Math.floor(Math.random()*6);
};

var randomColor = function() {
	var r = safeColors[rand()];
	var g = safeColors[rand()];
	var b = safeColors[rand()];
	return "#"+r+g+b;
};

$(document).ready(function() {

//create a reference to firebase
var url = "https://lyriikkaa.firebaseio.com/";
var lyricRef = new Firebase(url);

//register DOM elements

var artist = $('#artist');
var song = $('#song');
var lyric = $('#lyric');
var emailField = $('#email');
var passwordField = $('#password');
var lyricList = $("#lyriikkalista");
var loginButton = $('#loginbutton');


$("sendLyrics").submit(function(){

	var date = Date();
	var artistData = artist.val();
	var songData = song.val();
	var lyricData = lyric.val();

	console.log("moi t. funct1");
// create a new lyric data
console.log(artistData + " " + songData + " " + lyricData);

lyricRef.push({Artist: artistData, Song: songData, Lyric: lyricData, Date: date}); 

event.preventDefault();


});

/*function authorize(evt){

	lyricRef.authWithPassword({
		email : emailField.val(),
		password : passwordField.val()
	}, function(error, authData) { window.alert("Dude, that login wasn't cool. At all."); }, {
		remember: "sessionOnly"
	});


}*/




/*
lyricRef.on('child_added', function(snapshot){

	console.log("saatana jos se käy täällä");
	var data = snapshot.val();
	var artistName = data.Artist;
	var songName = data.Song;
	var lyricName = data.Lyric;

	var lyricBox = $("<div>").addClass("lyriikanpala");
	var artistElement = $("<h1>");
	var songElement = $("<h2>");
	artistElement.text(artistName);
	songElement.text(songName);
	var lyricElement = $("<p>");
	lyricElement.text(lyricName);
	lyricBox.append(artistElement, songElement, lyricElement);
	lyricBox.css('background',randomColor());
	lyricList.append(lyricBox);
	


});
*/




//loginButton.onclick = authorize;

});