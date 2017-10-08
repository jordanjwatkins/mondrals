(function (Blocks, randNum, Mondral, dom) {
	'use strict';

	function mondrals(elContainer) {
		var game = new Game(elContainer);

		return game;
	}

	function Game(elContainer) {
		var self = this, fps = 60;
		var mondrian = window.mondrian(elContainer);

		elContainer.style.width = mondrian.cWidth + 'px';

		this.mondralCount = 0;
		this.elContainer = elContainer;
		this.height = elContainer.clientHeight;
		this.width = mondrian.el.clientWidth;
		this.mondrian = mondrian;
		this.blocks = new Blocks(dom.find('.block', mondrian.el), self);
		this.entities = [];
		this.counter = 1;
		this.gameOver = false;
		this.points = 0;
		this.startTime = new Date();
		this.endTime = 0;

		this.update = function () {
			var flatCount = 0, i = 0;

			if (this.mondralCount < 5 && this.counter % 50 === 0) {
				this.addMondral();
			}

			for (i = 0; i < this.entities.length; i++) {
				this.entities[i].update();

				if (this.entities[i].flat) {
					flatCount++;
				}
			}

			if (flatCount + this.points >= this.entities.length && this.entities.length > 0) {
				if (!this.gameOver) {
					this.gameOver = true;
					this.gameOverText();

					// end game loop
					setTimeout(function () {
						clearInterval(self.gameLoop);
					}, 4000);
				}
			}

			this.counter++;
		};

		this.addMondral = function () {
			var self = this;
			var spawnPoint = { x: randNum(this.mondrian.cWidth - 40) + 20, y: 0 };

			this.eventText('Get Ready!', 'red', spawnPoint.x - 20, spawnPoint.y - 20);

			setTimeout(function () {
				var mondral = new Mondral(spawnPoint, self);

				self.eventText('Spawn!', 'red', spawnPoint.x - 20, spawnPoint.y - 20);

				self.entities.push(mondral);

				setTimeout(function () {
					self.elContainer.appendChild(mondral.el);
				}, 100);
			}, 3000);

			this.mondralCount++;
		};

		this.eventText = function (text, color, x, y) {
			var elText = dom.make('<div>' + text + '</div>');

			dom.css(elText, {
				color: color,
				position: 'absolute',
				left: x + 'px',
				top: y + 'px',
				fontWeight: 'bold',
				whiteSpace: 'nowrap',
				transition: '1500ms opacity, 1500ms transform',
			});

			setTimeout(function () {
				dom.css(elText, {
					opacity: 0,
					transform: 'translateY(-200%)',
				});

			}, 100);

			this.elContainer.appendChild(elText);
		};

		this.gameOverText = function () {
			var text = '<div class="escaped">' + this.points + ' / ' + this.entities.length + ' Escaped</div>';

			this.endTime = new Date();

			text += '<div class="time">Time: ' + ((this.endTime.getTime() - this.startTime.getTime()) / 1000) + ' seconds</div>';
			text += '<a class="try-again" href="./">Try Again</a>';

			this.elContainer.appendChild(
				dom.make('<div class="game-over"><h2>Game Over</h2>' + text + '</div>')
			);
		};

		// start game loop
		this.gameLoop = setInterval(function () {
			self.update();
		}, 1000 / fps);
	}

	window.mondrals = mondrals;
})(window.Blocks, window.randNum, window.Mondral, window.dom);