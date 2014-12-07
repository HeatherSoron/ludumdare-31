var keys = {
	'1': 49,
	'2': 50,
	'3': 51,
	
	'a': 65,
	'c': 67,
	'd': 68,
	'e': 69,
	'f': 70,
	's': 83,
	'q': 81,
	'w': 87,
	'x': 88,
	'z': 90,
	
	'space': 32,
	
	'left': 37,
	'right': 39,
	
	'up': 38,
	'down': 40,
}

var keysHeld = [];


function registerListeners() {
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
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
		
		case keys.a:
			if (!keysHeld[e.keyCode]) {
				player.attack(0);
			}
			break;
		case keys.s:
			if (!keysHeld[e.keyCode]) {
				player.attack(1);
			}
			break;
		case keys.d:
			if (!keysHeld[e.keyCode]) {
				player.attack(2);
			}
			break;
		case keys.f:
			if (!keysHeld[e.keyCode]) {
				player.attack();
			}
			break;
		
		case keys['1']:
		case keys.z:
			player.color = 0;
			break;
		case keys['2']:
		case keys.x:
			player.color = 1;
			break;
		case keys['3']:
		case keys.c:
			player.color = 2;
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
	
	keysHeld[e.keyCode] = true;
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
	
	keysHeld[e.keyCode] = false;
}
