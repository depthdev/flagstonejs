/*
 FlagstoneJS v2.1.1
 (c) 2015 Depth Development. http://depthdev.com
 License: Apache 2.0
*/

function Flagstone(settings) {

  var _ = function(s) { var a = [], nl = document.querySelectorAll(s); for (var i = 0, l = nl.length; i < l; i++) { a[i] = nl[i]; } return a.length > 1 ? a : a[0]; };

  var o = settings || {};
  // AREA (CONTAINER)
  var areaStr = o.area || '[flagstones]';
  var area = _(areaStr);
  var areaMargin = o.margin || o.margin === 0 ? o.margin : o.areaMargin || o.areaMargin === 0 ? o.areaMargin : 10;
  var areaWidth = 0;
  var areaHeight = 0;
  // MIN WIDTH
  var minWidth = o.minWidth || 280;
  // COLUMNS
  var maxColumns = o.maxColumns || 1920;
  var calcColumns = 0;
  var columns = 0;
  // FLAGSTONES
  var flagstonesStr = o.flagstones || '[flagstone]';
  var flagstones = _(flagstonesStr);
  var flagstonesMargin = o.margin || o.margin === 0 ? o.margin : o.flagstonesMargin || o.flagstonesMargin === 0 ? o.flagstonesMargin : 10;
  var flagstoneWidth = (areaWidth / columns) - ((flagstonesMargin * (columns + 1)) / columns);
  var flagstoneHeights = [];
  // DIRECTION
  var direction = o.direction ? o.direction.toLowerCase() : 'left';
  // RANDOM POSITIONS
  var random = o.random ? (flagstones.sort(function(){ return 0.5-Math.random(); }), true) : false;
  // RANDOM SPACE FREQUENCY
  var spaceFrequency = o.spaceFrequency || 0.4;
  // RANDOM SPACE GENERATOR
  var spaceGenerator = function() {
    for (var i = 0, l = flagstones.length; i < l; i++) {
      if (Math.random() < spaceFrequency) {
        flagstones.splice(i, 0, false); // Inject an element with the boolean "false"
      }
    }
  };
  // RANDOM SPACE
  var space = o.space ? (spaceGenerator(), true) : false;
  // ANIMATION
  var duration = o.duration / 1000 || 0;
  // RESIZE/RESET DELAY
  var resizeDelay = o.resizeDelay || o.resizeDelay === 0 ? o.resizeDelay : 250;
  // SQUARE
  var square = o.square || false;
  // HIDE (for Developers as well when then are injecting new content onto their page, so they can hide the flagstones before they get a change to re-calculate);
  this.hide = function() {
    area.className = area.className + ' flagstones-hidden';
  };
  // CUSTOM
  var custom = o.custom || function() { return false; };

  // RUN
  var run = function() {
    var columnHeights = [columns];
    for (var i = 0, l = flagstoneHeights.length; i < l; i++) {
      if (i < columns) {
        // First "row"
        if (flagstones[i]) {
          var width = flagstones[i].style.cssText.replace(/.*width\:\s?(\d+).+/, '$1');
          flagstones[i].style.cssText = 'width:' + width + 'px;' + (square ? 'height:' + width + 'px;': '') + 'top:' + areaMargin + 'px;' + direction + ':' + (flagstoneWidth * i + (i ? flagstonesMargin * i + areaMargin : areaMargin)) + 'px;';
          columnHeights[i] = flagstoneHeights[i] + areaMargin;
          custom(i, flagstones[i]);
        } else {
          if (columns > 1) {
            columnHeights[i] = flagstoneWidth + areaMargin;
          }
        }
      } else {
        // Every other "row"
        var smallestColumnHeight = Math.min.apply(null, columnHeights);
        var smallestColumn = columnHeights.indexOf(smallestColumnHeight);
        if (flagstones[i]) {
          var width = flagstones[i].style.cssText.replace(/.*width\:\s?(\d+).+/, '$1');
          flagstones[i].style.cssText = 'width:' + width + 'px;' + (square ? 'height:' + width + 'px;': '') + 'top:' + (smallestColumnHeight + flagstonesMargin) + 'px;' + direction + ':' + (flagstoneWidth * smallestColumn + (smallestColumn ? flagstonesMargin * smallestColumn + areaMargin : areaMargin)) + 'px;';
          columnHeights[smallestColumn] += flagstoneHeights[i] + flagstonesMargin;
          custom(i, flagstones[i]);
        } else {
          if (columns > 1) {
            columnHeights[smallestColumn] += flagstoneWidth + flagstonesMargin;
          }
        }
      }
      area.style.height = (Math.max.apply(null, columnHeights) || flagstoneHeights[0] + areaMargin) + areaMargin + 'px';
    }
    setTimeout(function() {
      area.className = area.className.replace(/\s?flagstones\-hidden/, '');
    }.bind(this), 0);
  }; // end run()
  // RESIZE AND RESET
  var resetDelay1;
  var resetDelay2;
  var resetDelay3;
  this.reset = function() {
    // Set area
    areaWidth = area.outerWidth || area.offsetWidth;
    if (areaWidth < minWidth + (areaMargin ? areaMargin * 2 : 0)) {
      areaWidth = minWidth;
    }
    // Set widths
    calcColumns = Math.floor(areaWidth / minWidth);
    columns = calcColumns > maxColumns ? maxColumns : calcColumns;
    flagstoneWidth = (areaWidth / columns) - ((flagstonesMargin * (columns - 1) + (areaMargin * 2)) / columns);
    // Set heights
    flagstoneHeights = [];
    for (var i = 0, l = flagstones.length; i < l; i++) {
      if (flagstones[i]) {
        flagstones[i].style.width = flagstoneWidth + 'px';
      }
      flagstoneHeights.push(square || !flagstones[i] ? flagstoneWidth : flagstones[i].outerHeight || flagstones[i].offsetHeight);
    }
    run();
  }.bind(this);
  // DYNAMIC CONTENT RESET / HARD RESET
  this.hardReset = function() {
    this.hide();
    setTimeout(function() {
      flagstones = _(flagstonesStr);
      if (random) { flagstones.sort(function(){return 0.5-Math.random();}); }
      if (space) { spaceGenerator(); }
      this.reset();
    }.bind(this), 0);
  }.bind(this);
  // RESETS (ADDRESSES ISSUES WITH POSITIONING WHEN CSS ANIMATIONS ARE USED, THAT'S WHY THERE ARE 3 RESETS)
  var resets = function() {
      clearTimeout(resetDelay1);
      clearTimeout(resetDelay2);
      clearTimeout(resetDelay3);
      resetDelay1 = setTimeout(this.reset.bind(this), resizeDelay);
      resetDelay2 = setTimeout(this.reset.bind(this), (duration * 1000) + resizeDelay);
      resetDelay3 = setTimeout(this.reset.bind(this), (duration * 2000) + resizeDelay);
  }.bind(this);
  // INITIALIZE
  (function() {
    this.hide;
    // Setup styles if not already injected (prevents duplicates on single page applications)
    if (!_('#flagstone-styles')) {
      var styles = areaStr + '{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;min-width:' + (minWidth + (flagstonesMargin * 2)) + 'px;}' + flagstonesStr + '{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;top:0px;' + direction + ':0px;}' + areaStr + '.flagstones-hidden{visibility:hidden;}' + areaStr + '{-webkit-transition-duration:' + duration + 's;-moz-transition-duration:' + duration + 's;-ms-transition-duration:' + duration + 's;-o-transition-duration:' + duration + 's;transition-duration:' + duration + 's;}' + flagstonesStr + '{-webkit-transition-duration:' + duration + 's;-moz-transition-duration:' + duration + 's;-ms-transition-duration:' + duration + 's;-o-transition-duration:' + duration + 's;transition-duration:' + duration + 's;}';
      var style = document.createElement('style');
      style.type = 'text/css';
      style.id = 'flagstone-styles';
      style.appendChild(document.createTextNode(styles));
      _('head').appendChild(style);
    }
    // Run reset to calculate and run flagstone!
    setTimeout(this.reset, 0);
    // Reset immediately after resources have loaded to get correct heights
    addEventListener('load', resets.bind(this));
    // Resize listener
    addEventListener('resize', resets.bind(this));
  }.bind(this))()
} // end FLAGSTONEJS
