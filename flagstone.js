/*
 Copyright 2014 by CLEARWAVE DESIGNS, LLC.
 
 Licensed under the Apache License, Version 2.0
 http://www.apache.org/licenses/LICENSE-2.0
 
 Author:        Adam Carson
 Website:       http://clearwavedesigns.com
 Dependencies:  jquery.js (1.8.3+)
 
 Name(s):       FlagstoneJS (flagstone.js)
 Slogan:        "Responsive tiling."
 Description:   Responsively tiles HTML elements left to right, top to bottom, and where there's the most room.
*/
 
var FLAGSTONE = function(options) {
  var that = this;
  var obj = options || {};
  // AREA (CONTAINER)
  this.areaStr = obj.area || '[flagstones]';
  this.area = $(this.areaStr);
  this.areaWidth = this.area.outerWidth();
  this.areaHeight = this.area.outerHeight();
  // MIN WIDTH
  this.minWidth = obj.minWidth || 280;
  // COLUMNS
  this.maxColumns = obj.maxColumns || 1920;
  this.calcColumns = Math.floor(this.areaWidth / this.minWidth);
  this.columns = this.calcColumns > this.maxColumns ? this.maxColumns : this.calcColumns;
  // MARGIN
  this.margin = obj.margin || 10;
  // FLAGSTONES
  this.flagstonesStr = obj.flagstones || '[flagstone]';
  this.flagstones = $(this.flagstonesStr);
  this.flagstoneHeights = [];
  this.flagstoneWidth = (this.areaWidth / this.columns) - ((this.margin * (this.columns + 1)) / this.columns);
  // ANIMATION DURATION
  this.duration = obj.duration / 1000 || 1;
  // INITIALIZE THE OBJECT
  this.init = function() {
    $('head').append('<style>'+this.areaStr+'{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;min-width:'+(this.minWidth+(this.margin*2))+'px;-webkit-transition-duration:'+that.duration+'s;-moz-transition-duration:'+that.duration+'s;-ms-transition-duration:'+that.duration+'s;-o-transition-duration:'+that.duration+'s;transition-duration:'+that.duration+'s;}'+this.flagstonesStr+'{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;top:0px;left:0px;-webkit-transition-duration:'+that.duration+'s;-moz-transition-duration:'+that.duration+'s;-ms-transition-duration:'+that.duration+'s;-o-transition-duration:'+that.duration+'s;transition-duration:'+that.duration+'s;}</style>');
    if (this.areaWidth < this.minWidth + (this.margin * 2)) {this.areaWidth = this.minWidth; }
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
          'left': this.flagstoneWidth * smallestColumn + (this.margin * (smallestColumn + 1)) + 'px'
        });
        columnHeights[smallestColumn] += this.flagstoneHeights[i] + this.margin;
      } else {
        for (var i1 = 0, l1 = this.columns; i1 < l1; i1++) {
          this.flagstones.eq(i1).css({
            'top': this.margin + 'px',
            'left': this.flagstoneWidth * i1 + (this.margin * (i1 + 1)) + 'px'
          });
          columnHeights[i1] = this.flagstoneHeights[i1] + this.margin;
        }
      }
      this.area.css('height',  Math.max.apply(null, columnHeights) + this.margin + 'px');
    }
  };
  this.run(); // Initial run
  // RE-RUN IMMEDIATELY AFTER RESOURCES HAVE LOADED TO GET CORRECT HEIGHTS
  this.area.find('img,iframe,video,audio,object,embed').on('load', function() {
    that.reset();
  });
  // RESIZE AND RESET
  this.resetDelay1;
  this.resetDelay2; // Makes CSS's animation top align correctly
  this.reset = function() {
    that.areaWidth = that.area.outerWidth();
    if (that.areaWidth < that.minWidth + (that.margin * 2)) {that.areaWidth = that.minWidth; }
    that.calcColumns = Math.floor(that.areaWidth / that.minWidth);
    that.columns = that.calcColumns > that.maxColumns ? that.maxColumns : that.calcColumns;
    that.flagstoneWidth = (that.areaWidth / that.columns) - ((that.margin * (that.columns + 1)) / that.columns);
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
    that.resetDelay2 = setTimeout(that.reset,that.duration + 1100);
  });
  // DYNAMIC CONTENT RESET / HARD RESET
  this.hardReset = function() {
    that.flagstones = $(that.flagstonesStr);
    that.reset();
  };
};// end FLAGSTONE
