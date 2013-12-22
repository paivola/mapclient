/*
	main.js
	=======

	License: MIT, see LICENSE.
	Author(s): Juhani Imberg
*/

// Globals plz
var $ = null, $$ = null, EE = null, _ = null;
var L;
var range;

require.config({
	paths: {
		'minified': '../bower_components/minified/dist/minified',
		'leaflet': '../bower_components/leaflet-dist/leaflet'
	},
	baseUrl: "js"
});

require(['minified', 'leaflet', 'comms', 'range'], function(MINI, LL, comms, R) {

	// Minified init right here
	$ = MINI.$, $$ = MINI.$$, EE = MINI.EE, _ = MINI._;
	L = LL;

	// Basically on page load
	$(function() {

		comms.connect();

		initMap();
		range = R.init("#range", "#timePos");

	});

});

function resizeMap () {
	$("#map").set("$$height", 
		(
			window.innerHeight -
			$("#header").get("$height", true) -
			$("#footer").get("$height", true) -
			30
		)+"px");
	console.log("asd");
}

function initMap () {
	window.onresize = function() { resizeMap(); };
	resizeMap();

	var map = L.map("map").setView([6, 45], 6);
	L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		{
			minZoom: 3,
			maxZoom: 15,
			attribution: "Map data © OpenStreetMap contributors"
		}).addTo(map);
	map.fitBounds([
		[12, 40],
		[-5, 49]
	])
	//var marker = L.marker([9, 45]).addTo(map);
}
