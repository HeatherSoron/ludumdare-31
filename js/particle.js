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
	
	this.color = this.startColor;
	
	this.endColor.fadeRate = -(this.endColor.a/(life * 10.0));
	this.startColor.fadeRate = this.startColor.a/(life * 10.0);
	
	this.angleOffset = Math.random() * Math.PI * 2;
	
	particles.push(this);
}

Particle.prototype.simAndDraw = function() {
	this.life--;
	
	this.x += this.speed * Math.cos(this.dir);
	this.y += this.speed * Math.sin(this.dir);
	
	
	//drawStar(new Point(this.x, this.y), 5, 2, 7, 0, this.startColor);
	drawStar(new Point(this.x, this.y), 5, 2, 7, 0, this.endColor);
	
	//this.startColor.fade();
	//this.endColor.fade();
		
	if (this.life < 0) {
		return false;
	}
	return true;
}
