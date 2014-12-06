var keys = {
	'a': 65,
	'd': 68,
	's': 83,
	
	
	'left': 37,
	'right': 39,
	
	'up': 38,
	'down': 40,
}


function registerListeners() {
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
	console.log(e);
	document.getElementById("keycode").innerHTML = e.keyCode;
	
	switch (e.keyCode) {
		case keys.left:
			player.running = -1;
			e.preventDefault();
			break;
		case keys.right:
			player.running = 1;
			e.preventDefault();
			break;
		case keys.up:
			player.color++;
			e.preventDefault();
			break;
		case keys.down:
			player.colorDown();
			e.preventDefault();
			break;
	}
}

function handleKeyUp(e) {
	switch(e.keyCode) {
		case keys.left:
		case keys.right:
			player.running = 0;
	}
}
