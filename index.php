<!DOCTYPE html>
<html>
<head>
	<title>Mondrals</title>
	<link rel="stylesheet" href="mondrals.css" />
	<script src="js/vendor/jquery-1.8.3.min.js"></script>
	<script src="js/game.js"></script>
	<script src="js/functions.js"></script>
	<script src="js/mondrian.js"></script>
	<script src="js/mondral.js"></script>
	<script src="js/blocks.js"></script>	
</head>

<body>
	<div class="wrap">
		<div class="main">
			<div id="mondrals"></div>
		</div>
	</div>

	<script>
		$('document').ready(function(){
			var mondrals = $('#mondrals').mondrals();
		});
	</script>
</body>