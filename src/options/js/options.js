$( document ).ready(function() {
    $("[name='switch']").bootstrapSwitch();

	var configTileHeight=$(".config-tile > .well").outerHeight();
	$(".config-tile.new > .well").css('height',configTileHeight);
});