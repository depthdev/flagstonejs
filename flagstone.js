/*
 Copyright 2014 by CLEARWAVE DESIGNS, LLC.
 
 Licensed under the Apache License, Version 2.0
 http://www.apache.org/licenses/LICENSE-2.0
 
 Author:        Adam Carson
 Website:       http://clearwavedesigns.com
 Dependencies:  jquery.js (1.8.3+)
 
 Name(s):       FlagstoneJS (jQuery dependent)
 Slogan:        "Responsive tiling."
 Description:   Responsively tiles HTML elements left to right, top to bottom, and where there's the most room.
 */
 
var FLAGSTONE = function(obj) {
  var that = this;
  // AREA (CONTAINER)
  this.area = obj.area;
  this.areaWidth = this.area.outerWidth();
  this.areaHeight = this.area.outerHeight();
  // MIN WIDTH
  this.minWidth = obj.minWidth;
  // COLUMNS
  this.columns = Math.floor(this.areaWidth / this.minWidth);
  // MARGIN
  this.margin = obj.margin;
  // FLAGSTONES
  this.flagstones = obj.flagstones;
  this.flagstoneHeights = [];
  this.flagstoneWidth = (this.areaWidth / this.columns) - ((this.margin * (this.columns - 1)) / this.columns);
  // INITIALIZE THE OBJECT
  this.init = function() {
    this.flagstones.each(function() {
      var self = $(this);
      self.css('width', that.flagstoneWidth + 'px');
      that.flagstoneHeights.push(self.outerHeight());
    });
  };
  this.init();
  // RUN
  this.run = function() {
    var columnHeights = new Array(this.columns);
    for (var i = 0, l = this.flagstoneHeights.length; i < l; i++) {
      if (i >= this.columns) {
        var smallestColumnHeight = Math.min.apply(null, columnHeights);
        var smallestColumn = columnHeights.indexOf(smallestColumnHeight);
        this.flagstones.eq(i).css({
          'top': smallestColumnHeight + this.margin + 'px',
          'left': (this.flagstoneWidth + this.margin) * smallestColumn + 'px'
        });
        columnHeights[smallestColumn] += this.flagstoneHeights[i] + this.margin;
      } else {
        for (var i1 = 0, l1 = this.columns; i1 < l1; i1++) {
          this.flagstones.eq(i1).css({
            'top': '0px',
            'left': (this.flagstoneWidth + this.margin) * i1 + 'px'
          });
          columnHeights[i1] = this.flagstoneHeights[i1];
        }
      }
      this.area.css('height',  Math.max.apply(null, columnHeights) + 'px');
    }
  };
  this.run();
  // RESIZE AND RESET
  this.resetDelay1;
  this.resetDelay2; // Makes CSS's animation top align correctly
  this.reset = function() {
    that.areaWidth = that.area.outerWidth();
    that.columns = Math.floor(that.areaWidth / that.minWidth);
    that.flagstoneWidth = (that.areaWidth / that.columns) - ((that.margin * (that.columns - 1)) / that.columns);
    while(that.flagstoneHeights.length > 0) { that.flagstoneHeights.pop(); }
    that.flagstones.each(function() {
      var self = $(this);
      self.css('width', that.flagstoneWidth + 'px');
      that.flagstoneHeights.push(self.outerHeight());
    });
    that.run();
  };
  $(window).on('resize', function() {
    clearTimeout(that.resetDelay1);
    clearTimeout(that.resetDelay2);
    that.resetDelay1 = setTimeout(that.reset,100);
    that.resetDelay2 = setTimeout(that.reset,1100);
  });
};// end FLAGSTONE
