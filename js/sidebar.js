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
			sidehide:null,
			raw_settings:null,
			itemp:null,
			itemp2:null,
			init: function() {
				
				//this.sidehide = $("#stuff").toggle({$display: "block"}, {$display: "none"});
				this.sidehide = $("#stuff").toggle({$width: "250px"}, {$width: "0px"}, 500);
				
				var that = this;
				$("#hideside").on("click", function() {
					that.sidehide();
				});
                
                $("#available_button").on("click", function() {
                    $(".tab").set("$", "-selectedtab");
                    $("#available_tab").set("$", "+selectedtab");
                    $(".tabbutton").set("$", "-selectedtab");
                    this.set("$", "+selectedtab");
                });
                $("#current_button").on("click", function() {
                    $(".tab").set("$", "-selectedtab");
                    $("#current_tab").set("$", "+selectedtab");
                    $(".tabbutton").set("$", "-selectedtab");
                    this.set("$", "+selectedtab");
                });
                $("#selected_button").on("click", function() {
                    $(".tab").set("$", "-selectedtab");
                    $("#selected_tab").set("$", "+selectedtab");
                    $(".tabbutton").set("$", "-selectedtab");
                    this.set("$", "+selectedtab");
                });

 				
				this.itemp = _.template(["<li class='sidebarlist unselected'>",
											"{{name}}",
											"<ul class='sidebarlistchild hidden'>",
												"<li>Type: {{type}}</li>",
												"<li>Color: {{color}}</li>",
												"<li>Icon: {{icon}}</li>",
											"</ul",
										"</li>"].join(''));
				this.itemp2 = _.template("<li class='sidebarlist unselected'>{{name}}</li>");
			},
			updateSettings: function(data) {
				this.raw_settings = data.settings;
				$("#available_tab").ht("<ul>");
				for(var i in this.raw_settings) {
					var cur = this.raw_settings[i];
					var image = "<img src='../mapclient/bower_components/leaflet-dist/images/"+ cur.misc.icon + "'> </img>";
					$("#available_tab").add(HTML(this.itemp({name: i, type: cur.type, color: cur.color, icon: image })));
				}
				$("#available_tab").add(HTML("</ul"));
				
				$(".unselected").on("click", function() {
					$(".sidebarlist").set("$", "+unselected");
					$(this).set("$", "+selected -unselected");
					var name = $(this).get("innerHTML");
					$("#currently_placing").set('innerHTML', name);
					$(".sidebarlistchild").set("$", "+hidden");
					this.select(".sidebarlistchild").set("$", "-hidden");

					/*console.log($('.sidebarlistchild > *').filter( 
                        function (element) {
                              window.kissa =  $(element).get("innerHTML");
                              return _.startsWith( kissa, "Icon: " );
                        }

                    ).map( function(element) {
                       return $(element).get("innerHTML");    
                    }
    
                   ) );*/

				});
			}
		};

	}
);