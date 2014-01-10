/*
	popup.js
	========

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
			temp:null,
			init: function() {
				
				$(".block").set("$display", "none");
				$(".popup").set("$display", "none");
				
				this.temp = _.template(["<div class=\"popupheader\">{{title}}</div>",
										"<div class=\"popupcontent\">{{content}}</div>",
										"<div class=\"popupfooter\">",
											"<button id=\"ok\">ok</button>&nbsp;",
											"<button id=\"cancel\">cancel</button>",
										"</div"
										].join(''));
			},
			show: function(title, content, cb) {
				$(".popup").ht(this.temp({title: title, content: content}));
				$(".popup").set("$display", "block");
				$(".block").set("$display", "flex");
				$("#ok").on("click", function() {
					cb(true);
					$(".popup").set("$display", "none");
					$(".block").set("$display", "none");
				});
				$("#cancel").on("click", function() {
					cb(false);
					$(".popup").set("$display", "none");
					$(".block").set("$display", "none");
				});
			}
		};

	}
);