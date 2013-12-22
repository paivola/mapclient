/*
	comms.js
	========

	License: MIT, see LICENSE.
	Author(s): Juhani Imberg
*/

define(['minified'],
	function(MINI) {

		var $ = MINI.$, $$ = MINI.$$, EE = MINI.EE;

		return {
			socket: null,
			ready: false,
			connect: function() {
				this.socket = new WebSocket("ws://localhost:443/");
				var that = this;
				this.socket.onopen = function(){that.onopen();}
				this.socket.onmessage = function(e){that.onmessage(e);}
				this.socket.onclose = function(){that.onclose();}
				this.socket.onerror = function(){that.onerror();}
				$("#serverStatus").set("$", "-beforeLoad +whileLoad");
				$("#serverStatus").ht("Connecting");
			},
			onopen: function() {
				this.socket.send(JSON.stringify({action: "hello"}));
			},
			onmessage: function(e) {

				var obj = JSON.parse(e.data);
				console.log(obj);

				switch(obj.action) {
					case "hello":
						$("#serverStatus").set("$", "-whileLoad +afterLoad");
						$("#serverStatus").ht("Connected");
						break;
					default:
						break;
				}

			},
			onclose: function() {

			},
			onerror: function() {

			}
		}

	}
);