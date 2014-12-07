var sfx = {};

function loadAudio() {
	createSfx('attack');
	createSfx("failure");
	createSfx("jump");
	createSfx("create");
	createSfx("powerup");
}

function createSfx(name) {
	sfx[name] = new Audio();
	sfx[name].src = "audio/" + name + ".wav";
}

function playSfx(name) {
	console.log(sfx);
	sfx[name].play();
}
