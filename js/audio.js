var sfx = {};

function loadAudio() {
	createSfx('attack');
}

function createSfx(name) {
	sfx[name] = new Audio();
	sfx[name].src = "audio/" + name + ".wav";
}

function playSfx(name) {
	console.log(sfx);
	sfx[name].play();
}
