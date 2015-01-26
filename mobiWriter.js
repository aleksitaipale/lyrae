//var safeColors = ['#3FB8AF', '#7FC7AF', '#FF7473', '#FF9E9D'];
//TODO: MOBILE AUTHORIZE, UU YEA


$(document).ready(function() {

	


//create a reference to firebase
var url = "https://lyriikkaa.firebaseio.com/";
var lyricRef = new Firebase(url);
var authData = lyricRef.getAuth();


function authorize(evt){
	console.log("Logging in...");


	var emailValue = $('#email').val();
	var passwordValue = $('#password').val();

	lyricRef.authWithPassword({
		email : $('#email').val(),
		password : $('#password').val()
	}, function(error, authData){
		if (error){
			$("#mobiLogin").notify(
				("Incorrect login!"),
				{className:'error'},
				{arrowShow:false});
		} else if (authData) {

			window.location.href = "index.html";
			


		}

		console.log(authData); }, {
			remember: "default"
		});

	evt.preventDefault();


}






$(document).on("click", "#mobiLogin",function(evt){
	authorize(evt);


});

function submitLyrics(event){
	var date = Date();
	var artistData = $("#artist").val();
	var songData = $("#song").val();
	var lyricData = $("#lyric").val();
	console.log("New data is being pushed to the database...");
// create a new lyric data

lyricRef.push({Artist: artistData, Song: songData, Lyric: lyricData, Date: date});
event.preventDefault();
window.location.href = "index.html";


}

$(document).on("click", ".submitbutton",submitLyrics);


});


