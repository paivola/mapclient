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
var objectlist = { "points": [], "connections": [] };

require.config({
	paths: {
		'minified': '../bower_components/minified/dist/minified',
		'leaflet': '../bower_components/leaflet-dist/leaflet'
	},
	baseUrl: "js"
});

require(['minified', 'leaflet', 'comms', 'range', 'sidebar'], function(MINI, LL, comms, R, side) {

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
		alert(e.lat);
		var point = { "latlng" : [] };
		objectlist.points.push( e.latlng );
		alert(objectlist.points);
	});
	
	L.control.layers(null, overlays).addTo(map);

	//var marker = L.marker([9, 45]).addTo(map);
}
