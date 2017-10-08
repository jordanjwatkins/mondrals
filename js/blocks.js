(function (dom) {
	'use strict';

	function Blocks(blocks, game) {
		var self = this;
		var colors = [];
		var id = 1;

		dom.each(blocks, function (elBlock) {
			elBlock.id = 'block' + id;
			elBlock.color = rgb2hex(elBlock.style.backgroundColor);
			elBlock.pos = fullPos(elBlock);

			if (!Array.isArray(colors[elBlock.color])) {
				colors[elBlock.color] = [];
			}

			colors[elBlock.color][elBlock.id] = elBlock;

			id++;
		});

		dom.onTap(blocks, function (event) {
			var elBlock = event.target;
			var color = elBlock.color;

			if (color === '#cc0000') {
				dom.css(elBlock, {backgroundColor: '#666666'});

				elBlock.color = '#666666';

				self.colors['#666666'][elBlock.id] = elBlock;

				delete self.colors['#cc0000'][elBlock.id];
			}

			if (color === '#666666' && self.mondralFree(elBlock) && (Object.keys(self.colors['#cc0000']).length < 6)) {
				dom.css(elBlock, {backgroundColor: '#cc0000'});

				elBlock.color = '#cc0000';

				self.colors['#cc0000'][elBlock.id] = elBlock;

				delete self.colors['#666666'][elBlock.id];
			}
		});

		this.colors = colors;

		this.inBlock = function (point, color) {
			var block, blockPos;

			color = this.colors[color];

			for (block in color) {
				if (color.hasOwnProperty(block)) {
					blockPos = color[block].pos;

					if (point.x >= blockPos.left && point.x <= blockPos.right && point.y <= blockPos.bottom + game.mondrian.unitSize && point.y >= blockPos.top + game.mondrian.unitSize) {
						return true;
					}
				}
			}

			return false;
		};

		this.mondralFree = function (block) {
			var blockPos = block.pos;

			var mondral;

			for (mondral in game.entities) {
				if (game.entities.hasOwnProperty(mondral)) {
					mondral = game.entities[mondral];

					if (mondral.x + 10 >= blockPos.left && mondral.x - 10 <= blockPos.right && mondral.y + 10 <= blockPos.bottom + game.mondrian.unitSize && mondral.y + 10 >= blockPos.top + game.mondrian.unitSize) {
						return false;
					}
				}
			}

			return true;
		};
	}

	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		function hex(x) {
			return ('0' + parseInt(x,10).toString(16)).slice(-2);
		}

		return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	function fullPos(el, offset) {
		offset = Object.assign({}, { x:0, y:0 }, offset);

		return {
			'width':	el.clientWidth,
			'height':	el.clientHeight,
			'left':		el.offsetLeft,
			'top':		el.offsetTop,
			'right':	el.offsetLeft + el.clientWidth + offset.x,
			'bottom':	el.offsetTop + el.clientHeight + offset.y,
		};
	}

	window.Blocks = Blocks;
})(window.dom);