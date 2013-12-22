/*
	main.js - Main JS file for MapClient
	====================================

	License: MIT, see LICENSE.
	Author(s): Juhani Imberg
*/

// Globals plz
var $ = null, $$ = null, EE = null;
var L;

require.config({
	paths: {
		'minified': '../bower_components/minified/dist/minified',
		'leaflet': '../bower_components/leaflet-dist/leaflet'
	}
});

require(['minified', 'leaflet'], function(MINI, LL) {

	// Minified init right here
	$ = MINI.$, $$ = MINI.$$, EE = MINI.EE;
	L = LL;

	// Basically on page load
	$(function() {

		initMap();

		$("#hello").on("click", function () {
			console.log(L.version);
		});
		
	});

});

function resizeMap () {
	$("#map").set("$$height", (window.innerHeight - $("#header").get("$height", true) - $("#footer").get("$height", true) - 70)+"px");
		console.log($("#map").get("$$height"));
}

function initMap () {
	window.onresize = function() { resizeMap(); };
	resizeMap();

	var map = L.map("map").setView([9, 45], 5,8);
	L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {minZoom: 3, maxZoom: 15, attribution: "Map data © OpenStreetMap contributors"}).addTo(map);
}
