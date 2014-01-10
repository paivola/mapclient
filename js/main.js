/*
	main.js
	=======

	License: MIT, see LICENSE.
	Author(s): Juhani Imberg
*/

// Globals plz
var $;
var $$;
var EE;
var _;
var L;
var range;

require.config({
	paths: {
		'minified': '../bower_components/minified/dist/minified',
		'leaflet': '../bower_components/leaflet-dist/leaflet'
	},
	baseUrl: "js"
});

require(['minified', 'leaflet', 'comms', 'range', 'sidebar', 'popup'], function(MINI, LL, comms, R, side, popup) {

	// Minified init right here
	$ = MINI.$;
	$$ = MINI.$$;
	EE = MINI.EE;
	_ = MINI._;
	L = LL;

	// Basically on page load
	$(function() {

		comms.weeks = 52*20;
		comms.connect();

		initMap();
		range = R.init("#range", "#timePosWeek", "#timePosYear", 20);
		
		side.init();
		comms.addCB("getsettings", function(d){side.updateSettings(d);});
		
		popup.init();
		
		$("#connectionSettings").on("click", function() {
			popup.show("Connection settings", "Host&nbsp;<input id=\"host\" placeholder=\"localhost\"><br /> Port&nbsp;<input id=\"port\" placeholder=\"8080\">", function(ok) {
			if(ok) {
				comms.host = $("#host").get("value");
				comms.port = $("#port").get("value", true);
				console.log(comms.host+", "+comms.port);
				comms.connect();
			}
		});});
		

	});

});

function resizeMap () {
	$("#map").set("$$height", 
		(
			window.innerHeight -
			$("#header").get("$height", true) -
			$("#footer").get("$height", true) -
			25
		)+"px");
}

function initMap () {
	window.onresize = function() { resizeMap(); };
	resizeMap();
	
	var overlays = {
		"Points": L.layerGroup(),
		"Paths": L.layerGroup(),
		"Areas": L.layerGroup()
	};

	var map = L.map("map", {
		doubleClickZoom: false,
		layers: [overlays.Points, overlays.Paths, overlays.Areas],
		worldCopyJump: true
	}).setView([6, 45], 6);
	L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		{
			minZoom: 3,
			maxZoom: 15,
			attribution: "Map data © OpenStreetMap contributors"
		}).addTo(map);
	
	map.fitBounds([
		[12, 40],
		[-5, 49]
	]);
	
	map.on('dblclick', function(e) {
		console.log(e.latlng);
		L.marker(e.latlng, {opacity: 0.65}).addTo(overlays.Points);
	});
	
	L.control.layers(null, overlays).addTo(map);

	//var marker = L.marker([9, 45]).addTo(map);
}
