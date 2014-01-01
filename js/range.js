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
			statusElementWeek:null,
			statusElementYear:null,
			template:null,
			value:0,
			max:0,
			week:0,
			year:0,
			fill:0,
			maxYears:0,
			init: function(range, statusWeek, statusYear, maxYears, callback) {
				this.rangeElement = $(range);
				this.statusElementWeek = $(statusWeek);
				this.statusElementYear = $(statusYear);
				this.rangeElement.set("@max", maxYears*52-1);
				this.rangeElement.set("@min", 0);
				this.rangeElement.set("@step", 1);
				this.template = _.template("( {{a}} / {{b}} )");
				this.maxYears = maxYears-1;
				var that = this;
				this.rangeElement.onChange(function(){that.onChange();});
				this.rangeElement.on("|keydown", function(){that.onChange();});
				this.onChange();
			},
			onChange: function() {
				this.value = this.rangeElement.get("value", true);
				this.max = this.rangeElement.get("@max", true);
				this.week = this.value%52+1;
				this.year = Math.floor(this.value/52);
				this.statusElementWeek.ht(this.template, 
					{
						a: this.pad(this.week,2),
						b: 52
					});
				this.statusElementYear.ht(this.template,
					{
						a: this.pad(this.year,Math.ceil(Math.log(this.maxYears+1)/Math.LN10)),
						b: this.maxYears
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