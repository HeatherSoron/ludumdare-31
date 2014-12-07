var particles = [];

function Particle(x, y, startColor, endColor, life, speed, accelFunc, dir, angSpeed) {
	this.x = x;
	this.y = y;
	this.startColor = startColor.clone();
	this.endColor = endColor.clone();
	this.life = life;
	this.speed = speed;
	this.dir = dir;
	this.accelFunc = accelFunc;
	this.angSpeed = angSpeed;
	
	this.maxLife = this.life;
	
	this.endColor.fadeRate = -(this.endColor.a/(life * 10.0));
	this.startColor.fadeRate = this.startColor.a/(life * 10.0);
	
	this.angleOffset = Math.random() * Math.PI * 2;
	
	particles.push(this);
}

Particle.prototype.simAndDraw = function() {
	this.life--;
	
	this.x += this.speed * Math.cos(this.dir);
	this.y += this.speed * Math.sin(this.dir);
	
	if (this.accelFunc) {
		this.accelFunc();
	}
	
	var color;
	if (this.life > this.maxLife / 2) {
		color = new Color(0, 0, 0, alpha, 'part');
		var components = 'rgb';
		// fake the values so that we have 100% shift when we're 50% of the way through lifespan
		var life = this.life / 2.0;
		var maxLife = this.maxLife / 1.0;
		for (var i = 0; i < components.length; ++i) {
			var comp = components[i];
			color[comp] = (this.startColor[comp] * 2.0) * (life) / (maxLife * 1.0);
			color[comp] += (this.endColor[comp] * 2.0) * (maxLife - life) / (maxLife * 1.0);
			color[comp] = Math.floor(color[comp] / 2);
		}
	} else {
		color = this.endColor;
	}
	
	drawStar(new Point(this.x, this.y), 5, 2, 7, 0, color);
		
	if (this.life < 0) {
		return false;
	}
	return true;
}

function decayParticleSpeed() {
	this.speed /= 1.125;
}
