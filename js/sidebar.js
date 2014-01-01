/*
	sidebar.js
	==========

	License: MIT, see LICENSE.
	Author(s): Juhani Imberg
*/

define(['minified'],
	function(MINI) {

		var $ = MINI.$;
		var $$ = MINI.$$;
		var EE = MINI.EE;
		var _ = MINI._;
		var HTML = MINI.HTML;

		return {
			sidebarElement:null,
			sidebarToggleElement:null,
			sidehide:null,
			raw_settings:null,
			itemp:null,
			itemp2:null,
			init: function(sidebar, toggle) {
				this.sidebarElement = $(sidebar);
				this.sidebarToggleElement = $(toggle);
				
				this.sidehide = this.sidebarElement.toggle({$display: "block"}, {$display: "none"});
				
				var that = this;
				this.sidebarToggleElement.on("click", function() {
					that.sidehide();
				});
				
				this.itemp = _.template(["<li>",
											"Name: {{name}}",
											"<ul>",
												"<li>Type: {{type}}</li>",
												"<li>Color: {{color}}</li>",
												"<li>Icon: {{icon}}</li>",
											"</ul",
										"</li>"].join(''));
				this.itemp2 = _.template("<li class='sidebarlist unselected'>{{name}}</li>");
				
				this.sidebarElement.ht("");
			},
			updateSettings: function(data) {
				this.raw_settings = data.settings;
				this.sidebarElement.ht("<ul>");
				for(var i in this.raw_settings) {
					var cur = this.raw_settings[i];
					this.sidebarElement.add(HTML(this.itemp2({name: i, type: cur.type, color: cur.color, icon: cur.misc.icon})));
				}
				this.sidebarElement.add(HTML("</ul"));
				
				$(".unselected").on("click", function() {
					$(".sidebarlist").set("$", "+unselected");
					$(this).set("$", "+selected -unselected");
					console.log("asd");
				});
			}
		};

	}
);