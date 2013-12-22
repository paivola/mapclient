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
			manager_id: -1,
			was_once: false,
			connect: function() {
				var message = (!this.was_once?"Connecting":"Reconnecting");
				console.log(message);

				this.socket = new WebSocket("ws://localhost:443/");
				var that = this;
				this.socket.onopen = function(){that.onopen();}
				this.socket.onmessage = function(e){that.onmessage(e);}
				this.socket.onclose = function(){that.onclose();}
				this.socket.onerror = function(){that.onerror();}
				$("#serverStatus").set("$", "-beforeLoad +whileLoad");
				$("#serverStatus").ht(message);
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
						this.callCreate(52);
						this.was_once = true;
						break;
					case "create":
						if(this.success(obj)) {
							this.manager_id = obj.manager_id;
							console.log("manager_id: "+obj.manager_id);
						}
						break;
					default:
						break;
				}

			},
			onclose: function() {
				$("#serverStatus").set("$", "-whileLoad -afterLoad +beforeLoad");
				$("#serverStatus").ht("Disconnected");
				this.connect();
			},
			onerror: function() {

			},

			callCreate: function(ticks) {
				if(this.socket == null || this.manager_id != -1) { return; }

				this.socket.send(JSON.stringify({action: "create", ticks: ticks}));

			},

			success: function(obj) {
				return obj.status === "success";
			}
		}

	}
);