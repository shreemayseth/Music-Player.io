var songs=["Dil Chori Sada Ho Gaya",
	   		"Morni Banke",
			"Bom Diggy Diggy",
	   		"Jaani Tera Naa - Sunanda Sharma",
			"Proper Patola - Namaste England","Bamb Song - Badshah ft. Sukhe",
	   		"Dill Ton Black - Jassie Gill n Badshah",
	   		"Coca Cola - Luka Chuppi",
	   		"Kamariya - Stree",
			"Urvashi - Yo Yo Honey Singh","Mera Wala Dance - Simmba",
			"Ishare Tere Song - Guru Randhawa"];


var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSong = document.getElementById('nextSong');

var song = new Audio();
var currentsong = 0;

window.onload = loadSong;

//Loading the songs from the drive
function loadSong() {
	song.src = "music/" + songs[currentsong];
	songTitle.textContent = (currentsong + 1)+"." +songs[currentsong];
	nextSong.innerHTML = "<b>Next Song: </b>" + songs[currentsong + 1 % songs.length];
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration,1000);
}


//Song slider
setInterval(updateSongSlider,1000);

function updateSongSlider() {
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c);
	if(song.ended){
		next();
	}
}

//Left side time duration
function convertTime(secs) {
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min<10)? "0" + min : min;
	sec = (sec<10)? "0" + sec : sec;
	return(min + ":" +sec);
}

//Right side time duration
function showDuration() {
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max",d);
	duration.textContent = convertTime(d);
}

//Play or pause the song
function playorpause(img) {
	if (song.paused){
		song.play();
			 $("#play img").attr("src","icons/Pause.png");
	}else{
		song.pause();
			 $("#play img").attr("src","icons/Play.png");
	}
}

//To go to the next song
function next(){
	currentsong = (currentsong + 1) % songs.length;
	loadSong();
}

//To go back to the previous song
function previous () {
	currentsong--;
	currentsong = (currentsong < 0) ? songs.length - 1:currentsong;
	loadSong();
}

//Controlling the Song Slider
function seekSong () {
	song.currentTime = songSlider.value;
	currentTime.textContent = convertTime(song.currentTime);
}

//Adjusting the volume
function adjustVolume () {
	song.volume = volumeSlider.value;
}
