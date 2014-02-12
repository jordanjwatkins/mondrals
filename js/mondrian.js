(function($){
	$.fn.mondrian = function() {
		$(this).prepend('<div id="mondrian"></div>');
		
		var $canvas = $(this).find('#mondrian');
		var unitSize = 100;
		var xUnits = 8;
		var yUnits = 3;
		var points = getPoints({x:0,y:0}, xUnits, yUnits);		
		var colors = ["666666","666666","666666","cc0000"];			
		var count = 0;
			
		this.unitSize = unitSize;
		this.cWidth = unitSize * xUnits + 10;
		this.cHeight = unitSize * yUnits + 10;
		
		build(this);
		
		return this;
		
		function build(el) {
			$canvas.css({width: el.cWidth, height: el.cHeight});
			while (points.length > 0) {
				addBlock(randPoint());
				count++;				
			}
		}
		
		function getSize(point) {
			var tries = 0;
			do {
				var size = randSize();
				tries++;
				if (tries > 5) {
					return false;
				}
			} while (!fits(point, size)); 
			return size;
		}
		
		function fits(point, size) {
			var tmpPoints = getPoints(point, size.x, size.y);
			for (var tmpPoint in tmpPoints) {
				if (!isActive(tmpPoints[tmpPoint])) {
					return false;
				}
			}			
			for (var index in points) {
				for (tmpPoint in tmpPoints) {						
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
			for (var i = 0; i < width; i++) {				
				for (var j = 0; j < height; j++) {
					y = origin.y + j * unitSize;
					x = origin.x + i * unitSize;
					points.push({"x": x, "y": y});		
				}			
			}					
			return points;
		}
		
		function addBlock(point) {	
			var size = getSize(point);
			if (size) {
				var color = randItem(colors);
				var $block = $('<div id="block-'+count+'" class="block"></div>').width(size.x * unitSize).height(size.y * unitSize).css({'background': '#'+color, 'left': point.x, 'top': point.y, 'border': '5px solid #000'});			
				$canvas.append($block);
			}
		}
		
		function isActive(point) {
			for (var index in points) {				
				if (point.x == points[index].x && point.y == points[index].y) {
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
		
		function addPoint(point) {
			$block = $('<div id="point-'+count+'" class="point"></div>').width(4).height(4).css({'background': '#000', 'left': point.x-2+'px', 'top': point.y-2+'px'});
			$canvas.append($block);			
		}
				
		function randSize() {			
			do {
				var size = {x:randNum(2), y:randNum(2)};
				break;						
			} while (1==1);
			return size;
		}					
	};	
})(jQuery);