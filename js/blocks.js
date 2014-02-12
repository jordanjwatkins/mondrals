function Blocks(blocks, game) {
	var self = this;
	var colors = [];
	var id = 1;
	
	blocks.click(function(e){
		var color = this.color;
		if (color == '#cc0000') {
			$(this).css('background-color', '#666666');
			this.color = '#666666';
			self.colors['#666666'][this.id] = this;
			delete self.colors['#cc0000'][this.id];
		}
		if (color == '#666666' && self.mondralFree(this) && (Object.keys(self.colors['#cc0000']).length < 6)) {
			$(this).css('background-color', '#cc0000');
			this.color = '#cc0000';
			self.colors['#cc0000'][this.id] = this;
			delete self.colors['#666666'][this.id];
		}
	});
	
	blocks.each(function() {				
		this.id = 'block' + id;
		this.color = rgb2hex($(this).css('background-color'));
		this.pos = fullPos($(this));		
		if (!Array.isArray(colors[this.color])) {
			colors[this.color] = [];
		}	
		colors[this.color][this.id] = this;	
		id++;
	});
	
	this.colors = colors;

	this.inBlock = function(point, color) {	
		color = this.colors[color];
		for (var block in color) {
			var blockPos = color[block].pos;
			if (point.x >= blockPos.left && point.x <= blockPos.right && point.y <= blockPos.bottom + game.mondrian.unitSize && point.y >= blockPos.top + game.mondrian.unitSize) {
				return true;
			}
		}		
		return false;
	};
	
	this.mondralFree = function(block) {	
		var blockPos = block.pos;
		for (var mondral in game.entities) {
			mondral = game.entities[mondral];
			if (mondral.x + 10 >= blockPos.left && mondral.x - 10 <= blockPos.right && mondral.y + 10 <= blockPos.bottom + game.mondrian.unitSize && mondral.y + 10 >= blockPos.top + game.mondrian.unitSize) {
				return false;
			}
		}		
		return true;
	};
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x,10).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function fullPos($el,offset) {
	offset = $.extend({},{x:0,y:0},offset);
	pos = $el.position();
	return {
		"width":	$el.outerWidth(),
		"height":	$el.outerHeight(),
		"left":		pos.left,
		"top":		pos.top,
		"right":	pos.left + $el.outerWidth() + offset.x,
		"bottom":	pos.top + $el.outerHeight() + offset.y
	};
}