(function (randItem, randNum) {
	'use strict';

	function Mondral(spawnPoint, game) {
		var self = this;

		this.id = game.entities.length + 1;
		this.colors = ['#cc0000'];
		this.color = randItem(this.colors);
		this.height = 20;
		this.width = 20;
		this.xSpeed = 0;
		this.ySpeed = 2;
		this.x = spawnPoint.x + this.width / 2;
		this.y = spawnPoint.y + this.height / 2;
		this.el = document.createElement('div');
		this.flat = false;
		this.fallDist = 0;
		this.overlapping = false;
		this.escaped = false;

		this.el.className = 'mondral';
		this.el.width = this.width + 'px';
		this.el.height = this.height + 'px';
		this.el.style = {
			left: spawnPoint.x  + 'px',
			top: spawnPoint.y  + 'px',
		};

		this.update = function () {
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
				} else if (!this.flat) {
					if (this.xSpeed === 0) {
						this.xSpeed = (randNum(2) > 1) ? 1 : -1;
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
						this.el.classList.add('reverse');
					} else {
						this.el.classList.remove('reverse');
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

				this.el.style.left = this.x - this.width / 2 + 'px';
				this.el.style.top = this.y  - this.height / 2 + 'px';

				if (this.x < -100 || this.x > game.width + 100 + self.width) {
					this.escaped = true;

					game.points++;

					if (this.x < -100) {
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
			self.el.classList.add('flat');
			self.flat = true;
		}

		function onMatching() {
			return (
				game.blocks.inBlock({ x: self.x - self.width, y: self.y + self.height / 2 }, self.color) ||
				game.blocks.inBlock({ x: self.x, y: self.y + self.height / 2 }, self.color)
			);
		}

		function atMatching() {
			return (
				game.blocks.inBlock({ x: self.x - self.width, y: self.y }, self.color) ||
				game.blocks.inBlock({ x: self.x, y: self.y }, self.color) ||
				((self.x > game.width || self.x - self.width / 2 < 0) && self.y + self.height < game.height)
			);
		}

		function atMondral() {
			var mondral;

			for (mondral in game.entities) {
				if (!game.entities.hasOwnProperty(mondral)) continue;

				mondral = game.entities[mondral];

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

	window.Mondral = Mondral;
})(window.randItem, window.randNum);