var keys = {
	'a': 65,
	'd': 68,
	'e': 69,
	's': 83,
	'q': 81,
	'w': 87,
	
	'space': 32,
	
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
	document.getElementById("keycode").innerHTML = e.keyCode;
	
	switch (e.keyCode) {
		case keys.q:
			player.placePlatform(0);
			break;
		case keys.w:
			player.placePlatform(1);
			break;
		case keys.e:
			player.placePlatform(2);
			break;
			
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
			
		case keys.space:
			player.startJump();
			e.preventDefault();
			break;
	}
}

function handleKeyUp(e) {
	switch (e.keyCode) {
		case keys.left:
		case keys.right:
			player.running = 0;
			break;
		case keys.space:
			player.endJump();
	}
}
