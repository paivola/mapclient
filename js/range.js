/*
	range.js
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

		return {
			rangeElement:null,
			statusElement:null,
			template:null,
			fill:0,
			init: function(range, status, callback) {
				this.rangeElement = $(range);
				this.statusElement = $(status);
				this.template = _.template("( {{a}} / {{b}} )");
				var that = this;
				this.rangeElement.onChange(function(){that.onChange();});
				this.onChange();
			},
			onChange: function() {
				this.fill = this.rangeElement.get("@max").length;
				this.statusElement.ht(this.template, 
					{
						a: this.pad(this.rangeElement.get("value", true),this.fill),
						b: this.rangeElement.get("@max", true)
					});
			},
			setMax: function(value) {
				this.rangeElement.set("@max", value);
				this.onChange();
			},
			getMax: function() {
				return this.rangeElement.get("@max", true);
			},
			pad: function(value, to) {
				var s = ""+value;
				var ln = s.length;
				s = "<span class='subtle'>"+value+"</span>";
				while(ln < to) {
					s = 0+s;
					ln++;
				}
				return s;
			}
		};

	}
);