var sfx = {};

var disableAudio = false;

function loadAudio() {
	createSfx('attack');
	createSfx("failure");
	createSfx("jump");
	createSfx("create");
	createSfx("powerup");
	
	if (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1) {
		disableAudio = true;
		var li = document.createElement("li");
		li.innerHTML = '<span class="ctrl">Audio is disabled in Safari</span>, due to an annoying audio lag issue. Reload in a different browser for audio. Or, if you want to hack the JavaScript, run "disableAudio = false" in the JS console.';
		var ul = document.getElementById("tips");
		ul.insertBefore(li, document.getElementById("first-tip"));
	}
}

function createSfx(name) {
	sfx[name] = new Audio();
	sfx[name].src = "audio/" + name + ".wav";
}

function playSfx(name) {
	if (disableAudio) {
		return;
	}
	sfx[name].play();
}
