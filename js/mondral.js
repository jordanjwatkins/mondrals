function Mondral(spawnPoint, game) {
	var self = this;
	this.id = game.entities.length + 1;
	this.colors = ["#cc0000"];			
	this.color = randItem(this.colors);
	this.height = 20;
	this.width = 20;
	this.xSpeed = 0;
	this.ySpeed = 2;
	this.x = spawnPoint.x + this.width / 2;
	this.y = spawnPoint.y + this.height / 2;
	this.el = $('<div class="mondral"></div>').width(this.width).height(this.height).css({'left': spawnPoint.x, 'top': spawnPoint.y});
	this.flat = false;
	this.fallDist = 0;
	this.overlapping = false;
	this.escaped = false;
	
	this.update = function() {
		if (!this.escaped) {		
			if (onMatching() && this.ySpeed > 0) {			
				if (!this.flat && this.fallDist > 106) {
					goFlat();
					self.y += 6;
				}	
				
				this.ySpeed = 0;
				this.fallDist = 0;
				
				if (!this.flat) {
					if (this.xSpeed === 0) {
						this.xSpeed = (randNum(2) > 1) ? 1 : -1;
					}
				}
			} else if (!onMatching() && this.ySpeed === 0 && this.y + this.height < game.height - 10) {
				this.ySpeed = 2;
				this.xSpeed = 0;			
			} else if (this.ySpeed > 0 && !onMatching()) {
				this.fallDist += this.ySpeed;
			} else {
				if (!this.flat) {
					if (this.xSpeed === 0) {
						this.xSpeed = (randNum(2) > 1) ? 1 : -1;
					}
				}
			}
			
			if (!this.flat) {
				if (atMatching()) {
					this.xSpeed = -this.xSpeed;
				}
				
				if (!atMondral()) {
					if (this.overlapping - 1 > 0) {
						this.overlapping--;
					} else {
						this.overlapping = false;
					}
				}
				
				if (this.xSpeed < 0) {
					this.el.addClass('reverse');
				} else {
					this.el.removeClass('reverse');
				}		
			}
			
			if (this.y + this.height / 2 > game.height - 11 && this.ySpeed > 0) {
				if (!this.flat && this.fallDist > game.mondrian.unitSize + 6) {
					goFlat();		
				} else {
					this.ySpeed = 0;
				}
			} 
															
			this.x += this.xSpeed;
			this.y += this.ySpeed;		
			this.el.css({'left': this.x - this.width / 2, 'top': this.y  - this.height / 2});

			if (this.x < - 100 || this.x > game.width + 100 ) {
				this.escaped = true;
				game.points++;
				if (this.x < - 100) {
					game.eventText('+1 Escape', 'red', this.x + 10, this.y - 70);
				} else {
					game.eventText('+1 Escape', 'red', this.x - 90, this.y - 70);
				}
			}
		}
	};
	
	function goFlat() {
		self.ySpeed = 0;			
		self.height = 1;
		self.x -= 4;
		self.el.addClass('flat');
		self.flat = true;		
	}
	
	function onMatching() {
		return (
			game.blocks.inBlock({x: self.x - (self.width / 2) - 5, y: self.y + self.height / 2}, self.color) || 
			game.blocks.inBlock({x: self.x + (self.width / 2) - 4, y: self.y + self.height / 2}, self.color)
		);
	}
	
	function atMatching() {
		return (
			game.blocks.inBlock({x: self.x - (self.width / 2) - 5, y: self.y + (self.height / 2) - 1}, self.color) ||
			game.blocks.inBlock({x: self.x + (self.width / 2) - 4, y: self.y + (self.height / 2) - 1}, self.color) ||
			((self.x + self.width / 2 > game.width || self.x - self.width / 2 < 0) && self.y + self.height / 2 < game.height - 11)
		);
	}
	
	function atMondral() {	
		for (var mondral in game.entities) {
			var mondral = game.entities[mondral];
			if (self.color === mondral.color && self.id !== mondral.id && !mondral.escaped) {
				if (((self.x > mondral.x - self.width + 1 && self.x < mondral.x - self.width - 2) || (self.x < mondral.x + self.width + 1  && self.x > mondral.x + self.width - 2)) && self.y === mondral.y) {					
					if (!self.overlapping || !mondral.overlapping) {						
						mondral.xSpeed = -mondral.xSpeed;
						self.xSpeed = -self.xSpeed;
					}
					self.overlapping = self.width;
					mondral.overlapping = self.width;
					return true;
				}
			}	
		}		
		return false;
	}
}