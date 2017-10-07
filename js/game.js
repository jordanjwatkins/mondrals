(function ($) {
	"use strict";
	$.fn.mondrals = function () {
		var game = new Game($(this));
		return game;
	};

	function Game($canvas) {
		var self = this, fps = 60;
		var mondrian = $canvas.mondrian();

		$canvas.css({width: mondrian.cWidth});
		
		// start game loop				
		this.gameLoop = setInterval(function () { self.update(); }, 1000 / fps);

		// construct game object
		this.mondralCount = 0;
		this.canvas = $canvas;
		this.height = $canvas.outerHeight();
		this.width = mondrian.width();
		this.mondrian = mondrian;
		this.blocks = new Blocks(this.mondrian.find('.block'), self);
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
					setTimeout(function(){clearInterval(self.gameLoop);console.log('game loop stopped');},4000);				
				}				
			}

			this.counter++;
		};

		this.addMondral = function () {
			var self = this;
			var spawnPoint = {x: randNum(this.mondrian.width() - 40) + 20, y: 0};
			this.eventText('Get Ready!', 'red', spawnPoint.x - 20, spawnPoint.y - 20);
			setTimeout(function(){
				self.eventText('Spawn!', 'red', spawnPoint.x - 20, spawnPoint.y - 20);
				var mondral = new Mondral(spawnPoint, self);
				self.canvas.append(mondral.el);
				self.entities.push(mondral);
			}, 3000);
			this.mondralCount++;
		};
		
		this.eventText = function (text, color, x, y) {
			$('<div>'+text+'</div>').css({color: color, position: 'absolute', left: x, top: y, fontWeight: 'bold',whiteSpace: 'nowrap'}).appendTo(this.canvas).animate({top: y - 30, opacity: 0}, 1500);
		}
		
		this.gameOverText = function () {
			var text = '<div class="escaped">' + this.points + ' / ' + this.entities.length + ' Escaped</div>';	
			this.endTime = new Date();
			text += '<div class="time">Time: ' + (((this.endTime.getTime() - this.startTime.getTime()) / 1000) + ' seconds') + '</div>';
			text += '<a class="try-again" href="./">Try Again</a>';			
			$('<div class="game-over"><h2>Game Over</h2>' + text + '</div>').appendTo(this.canvas);
		}
	}
})(jQuery);