/*
   Copyright 2014-2015 CLEARWAVE DESIGNS, LLC
   
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
   
          http://www.apache.org/licenses/LICENSE-2.0
   
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.
    
   Author:        Adam Carson
   Website:       http://clearwavedesigns.com
   Dependencies:  None.
    
   Name(s):       FlagstoneJS (flagstone.js)
   Version:       2.0.20150731
   Slogan:        "Responsive tiling."
   Description:   Responsively tiles HTML elements left or right, top to bottom, and where there's the most room.
 */
 
 function FLAGSTONE(settings) {

  var _ = function(s) { var a = [], nl = document.querySelectorAll(s); for (var i = 0, l = nl.length; i < l; i++) { a[i] = nl[i]; } return a.length > 1 ? a : a[0]; };

  var that = this;

  var o = settings || {};
  // AREA (CONTAINER)
  this.areaStr = o.area || '[flagstones]';
  this.area = _(this.areaStr);
  this.areaMargin = o.margin || o.margin === 0 ? o.margin : o.areaMargin || o.areaMargin === 0 ? o.areaMargin : 10;
  this.areaWidth = 0;
  this.areaHeight = 0;
  // MIN WIDTH
  this.minWidth = o.minWidth || 280;
  // COLUMNS
  this.maxColumns = o.maxColumns || 1920;
  this.calcColumns = 0;
  this.columns = 0;
  // FLAGSTONES
  this.flagstonesStr = o.flagstones || '[flagstone]';
  this.flagstones = _(this.flagstonesStr);
  this.flagstonesMargin = o.margin || o.margin === 0 ? o.margin : o.flagstonesMargin || o.flagstonesMargin === 0 ? o.flagstonesMargin : 10;
  this.flagstoneWidth = (this.areaWidth / this.columns) - ((this.flagstonesMargin * (this.columns + 1)) / this.columns);
  this.flagstoneHeights = [];
  this.flagstoneHeightsAvg = 0;
  // DIRECTION
  this.direction = o.direction ? o.direction.toLowerCase() : 'left';
  // RANDOM POSITIONS
  this.random = o.random ? (this.flagstones.sort(function(){ return 0.5-Math.random(); }), true) : false;
  // RANDOM SPACE FREQUENCY
  this.spaceFrequency = o.spaceFrequency || 0.4;
  // RANDOM SPACE GENERATOR
  this.spaceGenerator = function() {
    for (var i = 0, l = this.flagstones.length; i < l; i++) {
      if (Math.random() < this.spaceFrequency) {
        this.flagstones.splice(i, 0, false); // Inject an element with the boolean "false"
      }
    }
  };
  // RANDOM SPACE
  this.space = o.space ? (this.spaceGenerator(), true) : false;
  // ANIMATION
  this.duration = o.duration / 1000 || 0;
  // RESIZE/RESET DELAY
  this.resizeDelay = o.resizeDelay || o.resizeDelay === 0 ? o.resizeDelay : 250;
  // SQUARE
  this.square = o.square || false;
  // HIDE (for Developers as well when then are injecting new content onto their page, so they can hide the flagstones before they get a change to re-calculate);
  this.hide = function() {
    // Must use "that" because "this" binding only works inside the function and not when call by the Dev outside of it using their instance of it
    this.area.className = this.area.className + ' flagstones-hidden';
  };
  // CUSTOM
  this.custom = o.custom || function() { return false; };

  // RUN
  this.run = function() {
    var columnHeights = [this.columns];
    for (var i = 0, l = this.flagstoneHeights.length; i < l; i++) {
      if (i < this.columns) {
        // First "row"
        if (this.flagstones[i]) {
          var width = this.flagstones[i].style.cssText.replace(/.*width\:\s?(\d+).+/, '$1');
          this.flagstones[i].style = '';
          this.flagstones[i].style.cssText = 'width:' + width + 'px;' + (this.square ? 'height:' + width + 'px;': '') + 'top:' + this.areaMargin + 'px;' + this.direction + ':' + (this.flagstoneWidth * i + (i ? this.flagstonesMargin * i + this.areaMargin : this.areaMargin)) + 'px;';
          columnHeights[i] = this.flagstoneHeights[i] + this.areaMargin;
          this.custom(i, this.flagstones[i]);
        } else {
          columnHeights[i] = this.flagstoneHeightsAvg + this.areaMargin;
        }
      } else {
        // Every other "row"
        var smallestColumnHeight = Math.min.apply(null, columnHeights);
        var smallestColumn = columnHeights.indexOf(smallestColumnHeight);
        if (this.flagstones[i]) {
          var width = this.flagstones[i].style.cssText.replace(/.*width\:\s?(\d+).+/, '$1');
          this.flagstones[i].style = '';
          this.flagstones[i].style.cssText = 'width:' + width + 'px;' + (this.square ? 'height:' + width + 'px;': '') + 'top:' + (smallestColumnHeight + this.flagstonesMargin) + 'px;' + this.direction + ':' + (this.flagstoneWidth * smallestColumn + (smallestColumn ? this.flagstonesMargin * smallestColumn + this.areaMargin : this.areaMargin)) + 'px;';
          columnHeights[smallestColumn] += this.flagstoneHeights[i] + this.flagstonesMargin;
          this.custom(i, this.flagstones[i]);
        } else {
          columnHeights[smallestColumn] += this.flagstoneHeightsAvg + this.flagstonesMargin;
        }
      }
      this.area.style.height = (Math.max.apply(null, columnHeights) || this.flagstoneHeights[0] + this.areaMargin) + this.areaMargin + 'px';
    }
    setTimeout(function() {
      that.area.className = that.area.className.replace(/\s?flagstones\-hidden/, '');
    }, 0);
  }; // end run()
  // RESIZE AND RESET
  this.resetDelay1;
  this.resetDelay2;
  this.resetDelay3;
  this.reset = function() {
    // Must use "that" because "this" binding only works inside the function and not when call by the Dev outside of it using their instance of it
    // Set area
    that.areaWidth = that.area.outerWidth || that.area.offsetWidth;
    if (that.areaWidth < that.minWidth + (this.areaMargin ? that.areaMargin * 2 : 0)) {
      that.areaWidth = that.minWidth;
    }
    // Set widths
    that.calcColumns = Math.floor(that.areaWidth / that.minWidth);
    that.columns = that.calcColumns > that.maxColumns ? that.maxColumns : that.calcColumns;
    that.flagstoneWidth = (that.areaWidth / that.columns) - ((that.flagstonesMargin * (that.columns - 1) + (that.areaMargin * 2)) / that.columns);
    // Set heights
    that.flagstoneHeights = [];
    that.flagstoneHeightsAvg = 0;
    for (var i = 0, l = that.flagstones.length; i < l; i++) {
      if (that.flagstones[i]) {
        that.flagstones[i].style.width = that.flagstoneWidth + 'px';
      }
      that.flagstoneHeights.push(that.square || !that.flagstones[i] ? that.flagstoneWidth : that.flagstones[i].outerHeight || that.flagstones[i].offsetHeight);
      that.flagstoneHeightsAvg += that.flagstoneHeights[i];
    }
    // Set actual average heights
    that.flagstoneHeightsAvg = that.flagstoneHeightsAvg / that.flagstones.length;
    that.run();
  };
  // DYNAMIC CONTENT RESET / HARD RESET
  this.hardReset = function() {
    // Must use "that" because "this" binding only works inside the function and not when call by the Dev outside of it using their instance of it
    that.hide();
    setTimeout(function() {
      that.flagstones = _(that.flagstonesStr);
      if (that.random) { that.flagstones.sort(function(){return 0.5-Math.random();}); }
      if (that.space) { that.spaceGenerator(); }
      that.reset();
    }, 0);
  };
  // RESETS (ADDRESSES ISSUES WITH POSITIONING WHEN CSS ANIMATIONS ARE USED, THAT'S WHY THERE ARE 3 RESETS)
  this.resets = function() {
      clearTimeout(that.resetDelay1);
      clearTimeout(that.resetDelay2);
      clearTimeout(that.resetDelay3);
      that.resetDelay1 = setTimeout(that.reset.bind(that), that.resizeDelay);
      that.resetDelay2 = setTimeout(that.reset.bind(that), (that.duration * 1000) + that.resizeDelay);
      that.resetDelay3 = setTimeout(that.reset.bind(that), (that.duration * 2000) + that.resizeDelay);
  };
  // INITIALIZE
  this.init = function() {
    this.hide();
    // Setup styles
    var styles = this.areaStr + '{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;min-width:' + (this.minWidth + (this.flagstonesMargin * 2)) + 'px;}' + this.flagstonesStr + '{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;top:0px;' + this.direction + ':0px;}' + this.areaStr + '.flagstones-hidden{visibility:hidden;}</style>' + this.areaStr + '{-webkit-transition-duration:' + that.duration + 's;-moz-transition-duration:' + that.duration + 's;-ms-transition-duration:' + that.duration + 's;-o-transition-duration:' + that.duration + 's;transition-duration:' + that.duration + 's;}' + this.flagstonesStr + '{-webkit-transition-duration:' + that.duration + 's;-moz-transition-duration:' + that.duration + 's;-ms-transition-duration:' + that.duration + 's;-o-transition-duration:' + that.duration + 's;transition-duration:' + that.duration + 's;}';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(styles));
    _('head').appendChild(style);
    // Run reset to calculate and run flagstone!
    setTimeout(that.reset, 0);
    // Reset immediately after resources have loaded to get correct heights
    setTimeout(window.addEventListener('load', that.resets), 0);
    // Resize listener
    window.addEventListener('resize', that.resets);
  };
  this.init();
}; // end FLAGSTONEJS
