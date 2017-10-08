(function () {
	'use strict';

	function randNum(max) {
		return Math.floor(Math.random()*max+1);
	}

	function randItem(items) {
		return items[Math.floor(Math.random()*items.length)];
	}

	window.randNum = randNum;
	window.randItem = randItem;
})();