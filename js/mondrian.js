(function (dom, randItem, randNum) {
	'use strict';

	function mondrian(elParent) {
		var unitSize = 100;
		var xUnits = 8;
		var yUnits = 3;
		var points = getPoints({ x:0,y:0 }, xUnits, yUnits);
		var colors = ['666666','666666','666666','cc0000'];
		var count = 0;

		var elContainer = document.createElement('div');

		elContainer.id = 'mondrian';

		this.el = elContainer;

		elParent.appendChild(elContainer);

		this.unitSize = unitSize;
		this.cWidth = unitSize * xUnits + 10;
		this.cHeight = unitSize * yUnits + 10;

		build(this);

		return this;

		function build(el) {
			dom.css(elContainer, {
				'width': el.cWidth + 'px',
				'height': el.cHeight + 'px',
			});

			while (points.length > 0) {
				addBlock(randPoint());

				count++;
			}
		}

		function getSize(point) {
			var tries = 0;
			var size;

			do {
				size = randSize();

				tries++;

				if (tries > 5) {
					return false;
				}
			} while (!fits(point, size));

			return size;
		}

		function fits(point, size) {
			var tmpPoints = getPoints(point, size.x, size.y);
			var tmpPoint, index;

			for (tmpPoint in tmpPoints) {
				if (!isActive(tmpPoints[tmpPoint])) {
					return false;
				}
			}

			for (index in points) { // eslint-disable-line guard-for-in
				for (tmpPoint in tmpPoints) { // eslint-disable-line guard-for-in
					if (JSON.stringify(points[index]) === JSON.stringify(tmpPoints[tmpPoint])) {
						points.splice(index, 1);
					}
				}
			}

			return true;
		}

		function getPoints(origin, width, height) {
			var points = [];
			var y = 0;
			var x = 0;
			var i, j;

			for (i = 0; i < width; i++) {
				for (j = 0; j < height; j++) {
					y = origin.y + j * unitSize;
					x = origin.x + i * unitSize;
					points.push({ 'x': x, 'y': y });
				}
			}

			return points;
		}

		function addBlock(point) {
			var size = getSize(point);
			var color;
			var elBlock;

			if (size) {
				color = randItem(colors);
				elBlock = dom.make('<div id="block-' + count + '" class="block"></div>');

				elBlock.width = size.x * unitSize;
				elBlock.height = size.y * unitSize;

				dom.css(elBlock, {
					width: elBlock.width + 'px',
					height: elBlock.height + 'px',
					background: '#'+color,
					left: point.x + 'px',
					top: point.y + 'px',
					border: '5px solid #000',
				});

				self.el.appendChild(elBlock);
			}
		}

		function isActive(point) {
			var index;

			for (index in points) {
				if (point.x === points[index].x && point.y === points[index].y) {
					return true;
				}
			}

			return false;
		}

		function randPoint() {
			var index = Math.floor(Math.random()*points.length);
			var point = points[index];

			return point;
		}

		function randSize() {
			return { x: randNum(2), y: randNum(2) };
		}
	}

	window.mondrian = mondrian;
})(window.dom, window.randItem, window.randNum);