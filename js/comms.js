/*
	comms.js
	========
	
	Communication between mapserver and mapclient.

	License: MIT, see LICENSE.
	Author(s): Juhani Imberg
*/

define(['minified'],
	function(MINI) {

		var $ = MINI.$;
		var $$ = MINI.$$;
		var EE = MINI.EE;
		var _ = MINI._;

		return {
			socket: null,
			ready: false,
			manager_id: -1,
			was_once: false,
			weeks: 52,
			callbs: [],
			addCB: function(on, what) {
				this.callbs.push({action: on, cb: what});
			},
			checkCB: function(data) {
				for(var i = 0; i < this.callbs.length; i++) {
					if(this.callbs[i].action == data.action)
						this.callbs[i].cb(data);
				}
			},
			connect: function() {
				var message = (!this.was_once?"Connecting":"Reconnecting");

				this.socket = new WebSocket("ws://localhost:443/");
				var that = this;
				this.socket.onopen = function(){that.onopen();};
				this.socket.onmessage = function(e){that.onmessage(e);};
				this.socket.onclose = function(){that.onclose();};
				this.socket.onerror = function(){that.onerror();};
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
						$("#serverStatus").set("@title", "Connected to "+this.socket.url);
						this.callCreate(this.weeks);
						this.was_once = true;
						break;
					case "create":
						if(this.success(obj)) {
							this.manager_id = obj.manager_id;
							console.log("manager_id: "+this.manager_id);
							$("#simulationStatus").ht("Ready (ID: "+this.manager_id+")");
							this.callGetSettings();
						}
						break;
					default:
						break;
				}
				
				this.checkCB(obj);

			},
			onclose: function() {
				$("#serverStatus").set("$", "-whileLoad -afterLoad +beforeLoad");
				$("#serverStatus").ht("Disconnected");
				$("#serverStatus").set("@title", "");
				this.connect();
			},
			onerror: function() {

			},

			callCreate: function(ticks) {
				if(this.socket === null || this.manager_id !== -1) { return; }

				this.socket.send(JSON.stringify({action: "create", ticks: ticks}));

			},
			
			callGetSettings: function() {
				if(this.socket === null || this.manager_id === -1) { return; }
				
				this.socket.send(JSON.stringify({action: "getsettings", manager_id: this.manager_id}));
			},
            callStart: function() {
                if(this.socket === null || this.manager_id === -1) { return; }
                
                this.socket.send(JSON.stringify({action: "start", manager_id: this.manager_id}));
            },
			success: function(obj) {
				return obj.status === "success";
			}
		};

	}
);