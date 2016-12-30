/*
  FlagstoneJS v3.0.0-rc.1
  (c) 2015-2016 Depth Development. http://depthdev.com
  License: MIT
*/

(function(window, document) {

  'use strict';

  window.flagstone = function(devObj) {

    function Flagstone(dO) {

      const instanceIndex = window.flagstone.index;

      const o = dO ? dO.nodeName ? {elem:dO} : dO : {elem:document.getElementsByClassName('flagstone')[0]};
      // FLAGSTONE (CONTAINER)
      const bed = o.elem;
      const bedPadding = o.margin || o.margin === 0 ? o.margin : o.bedPadding || o.bedPadding === 0 ? o.bedPadding : 10;
      let bedWidth = 0;
      // MIN WIDTH
      const minWidth = o.minWidth || 280;
      // COLUMNS
      const maxColumns = o.maxColumns || 5;
      let calcColumns = 0;
      let columns = 0;
      // STONES
      let stones = [];
      const stonesMargin = o.margin || o.margin === 0 ? o.margin : o.stonesMargin || o.stonesMargin === 0 ? o.stonesMargin : 10;
      let stoneWidth = (bedWidth / columns) - ((stonesMargin * (columns + 1)) / columns);
      let stoneHeights = [];
      // DIRECTION
      const direction = o.direction ? o.direction.toLowerCase() : 'left';
      // RANDOM POSITIONS
      const random = o.random;
      // RANDOM SPACE FREQUENCY
      const spaceFrequency = o.spaceFrequency || 0.4;
      // RANDOM SPACE GENERATOR
      function spaceGenerator() {
        let i = 0;
        const l = stones.length;
        for (;i<l;i++) {
          if (Math.random() < spaceFrequency) {
            stones.splice(i, 0, false); // Inject an element with the boolean "false"
          }
        }
      }
      // RANDOM SPACE
      const space = o.space;
      // ANIMATION
      const animationDuration = o.animationDuration || 0;
      const animationDurationSeconds = o.animationDuration ? o.animationDuration / 1000 : 0;
      const animationTimingFunction = o.animationTimingFunction || 'linear';
      // RESIZE/RESET DELAY
      const resizeDelay = o.resizeDelay || o.resizeDelay === 0 ? o.resizeDelay : 250;
      // SQUARE
      const square = o.square;
      // HIDE (for Developers as well when then are injecting new content onto their page, so they can hide the stones before they get a change to re-calculate);
      function hide() {
        bed.classList.add('flagstone-' + instanceIndex + '-bed-hidden');
      }
      // IMAGES LOADED QUERY
      const imagesLoadedQueryDuration = o.imagesLoadedQueryDuration || 2500;
      const imagesLoadedQueryFrequency = o.imagesLoadedQueryFrequency || 100;
      // DRAG AND DROP
      const dragAndDrop = o.dragAndDrop;
      // CUSTOM
      const custom = o.custom || function() {
        return;
      };
      // RESET DELAY
      let resetDelay = null;

      // REMOVE STONES
      function stoneRemove(e) {
        let elem = e.target;
        const className = 'flagstone-' + instanceIndex + '-bed__stone';
        while (elem && !elem.classList.contains(className)) {
          elem = elem.parentElement;
        }
        if (elem && elem.classList.contains(className)) {
          bed.removeChild(elem);
        }
      }

      // DRAG & DROP
      const dd = {
        dragStone: null,
        targetStone: null,
        targetStoneMouseXPercent: 0,
        dragStart() {
          dd.dragStone = this;
          dd.dragStone.classList.add('flagstone-drag');
        },
        dragOver(e) {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = 'move';
          if (this !== dd.dragStone && this.hasAttribute('draggable')) {
            dd.targetStone = this;
            dd.targetStone.classList.add('flagstone-dragover');
            dd.targetStoneMouseXPercent = e.offsetX / this.offsetWidth;
            if (dd.targetStoneMouseXPercent < 0.5) {
              dd.targetStone.classList.remove('flagstone-right');
              dd.targetStone.classList.add('flagstone-left');
            } else {
              dd.targetStone.classList.remove('flagstone-left');
              dd.targetStone.classList.add('flagstone-right');
            }
            this.classList.remove('flagstone-dragover');
          } else if (this === bed) {
            this.classList.add('flagstone-dragover');
          }
        },
        dragEnd() {
          dd.dragStone.classList.remove('flagstone-drag');
        },
        dragLeave() {
          if (dd.targetStone) {
            bed.classList.remove('flagstone-dragover');
            dd.targetStone.classList.remove('flagstone-dragover');
            dd.targetStone.classList.remove('flagstone-left');
            dd.targetStone.classList.remove('flagstone-right');
          }
        },
        drop(e) {
          e.stopPropagation();
          if (dd.dragStone !== this && (this.hasAttribute('draggable') || this === bed)) {
            dd.targetStone = this;
            if (dd.targetStone === bed) {
              dd.targetStone.appendChild(dd.dragStone);
            } else {
              if (dd.targetStoneMouseXPercent < 0.5) {
                dd.targetStone.parentElement.insertBefore(dd.dragStone, dd.targetStone);
              } else {
                dd.targetStone.parentElement.insertBefore(dd.dragStone, dd.targetStone.nextElementSibling);
              }
            }
            dd.targetStone.classList.remove('flagstone-dragover');
            dd.targetStone.classList.remove('flagstone-left');
            dd.targetStone.classList.remove('flagstone-right');
            dd.dragStone.classList.remove('flagstone-drag');
          }
          return false;
        }
      };

      // RUN
      function run() {
        const columnHeights = [columns];
        let i = 0;
        const l = stoneHeights.length;
        for (;i<l;i++) {
          if (i < columns) {
            // First "row"
            if (stones[i]) {
              const width = stones[i].style.width.toString().replace(/(\d+).+/, '$1');
              stones[i].style.width = width + 'px';
              stones[i].style.top = bedPadding + 'px';
              stones[i].style[direction] = (stoneWidth * i + (i ? stonesMargin * i + bedPadding : bedPadding)) + 'px';
              if (square) {
                stones[i].style.height = width + 'px';
              }
              columnHeights[i] = stoneHeights[i] + bedPadding;
              custom(i, stones[i]);
            } else {
              if (columns > 1) {
                columnHeights[i] = stoneWidth + bedPadding;
              }
            }
          } else {
            // Every other "row"
            const smallestColumnHeight = Math.min.apply(null, columnHeights);
            const smallestColumn = columnHeights.indexOf(smallestColumnHeight);
            if (stones[i]) {
              const width = stones[i].style.width.toString().replace(/(\d+).+/, '$1');
              stones[i].style.width = width + 'px';
              stones[i].style.top = (smallestColumnHeight + stonesMargin) + 'px';
              stones[i].style[direction] = (stoneWidth * smallestColumn + (smallestColumn ? stonesMargin * smallestColumn + bedPadding : bedPadding)) + 'px';
              if (square) {
                stones[i].style.height = width + 'px';
              }
              columnHeights[smallestColumn] += stoneHeights[i] + stonesMargin;
              custom(i, stones[i]);
            } else {
              if (columns > 1) {
                columnHeights[smallestColumn] += stoneWidth + stonesMargin;
              }
            }
          }
          bed.style.height = (Math.max.apply(null, columnHeights) || stoneHeights[0] + bedPadding) + bedPadding + 'px';
        }
        window.setTimeout(() => {
          bed.classList.remove('flagstone-' + instanceIndex + '-bed-hidden');
        });
      } // end run()

      // RESIZE AND RESET
      function reset(pass) {
        if (!stones.length) {
          return;
        }
        // Set flagstone
        bedWidth = bed.getBoundingClientRect().width;
        if (bedWidth < minWidth + (bedPadding ? bedPadding * 2 : 0)) {
          bedWidth = minWidth;
        }
        // Set widths
        calcColumns = Math.floor(bedWidth / minWidth);
        columns = calcColumns > maxColumns ? maxColumns : calcColumns;
        stoneWidth = (bedWidth / columns) - ((stonesMargin * (columns - 1) + (bedPadding * 2)) / columns);
        // Set heights
        stoneHeights = [];
        let i = 0;
        const l = stones.length;
        for (;i<l;i++) {
          if (stones[i]) {
            stones[i].style.width = stoneWidth + 'px';
          }
          stoneHeights.push(square || !stones[i] ? stoneWidth : stones[i].offsetHeight);
        }
        // Repeats once to resolve the possible appearence of a window scrollbar, thus affecting the width calculations
        if (bedWidth === bed.getBoundingClientRect().width || pass) {
          run();
        } else {
          reset(true); // Run only one more time if width's don't match.
        }
      }

      // RESET AFTER IMAGES LOAD
      function resetAfterImagesLoad() {
        const dateNow = Date.now();
        const images = bed.getElementsByTagName('img');
        if (images.length) {
          const query = window.setInterval(() => {
            const imageHeights = [];
            let i = 0;
            const l = images.length;
            for (;i<l;i++) {
              imageHeights[i] = images[i].naturalHeight;
            }
            if (imageHeights.indexOf(0) === -1 || dateNow + imagesLoadedQueryDuration < Date.now()) {
              window.clearInterval(query);
              window.setTimeout(() => {
                reset(true);
              });
            }
          }, imagesLoadedQueryFrequency);
        }
      }

      // DYNAMIC CONTENT RESET / HARD RESET
      function resetHard() {
        hide();

        // Set bed class
        bed.classList.add('flagstone-' + instanceIndex + '-bed');

        // Get stones
        stones = Array.prototype.slice.call(bed.children); // Array conversion for random/space functions
        let i = 0;
        let l = stones.length;
        // Set stone classes
        for (;i<l;i++) {
          stones[i].classList.add('flagstone-' + instanceIndex + '-bed__stone');
        }

        // Bind drag and drop listeners
        if (dragAndDrop) {
          i = 0;
          for (;i<l;i++) {
            stones[i].setAttribute('draggable', 'true');
            stones[i].removeEventListener('dragstart', dd.dragStart);
            stones[i].addEventListener('dragstart', dd.dragStart);
            stones[i].removeEventListener('dragover', dd.dragOver);
            stones[i].addEventListener('dragover', dd.dragOver);
            stones[i].removeEventListener('dragleave', dd.dragLeave);
            stones[i].addEventListener('dragleave', dd.dragLeave);
            stones[i].removeEventListener('dragend', dd.dragEnd);
            stones[i].addEventListener('dragend', dd.dragEnd);
            stones[i].removeEventListener('drop', dd.drop);
            stones[i].addEventListener('drop', dd.drop);
          }
          bed.removeEventListener('dragover', dd.dragOver);
          bed.addEventListener('dragover', dd.dragOver);
          bed.removeEventListener('drop', dd.drop);
          bed.addEventListener('drop', dd.drop);
        }

        // Random/space setup
        if (random || space) {
          stones = Array.prototype.slice.call(stones);
          if (random) {
            stones.sort(() => 0.5 - Math.random());
          }
          if (space) {
            spaceGenerator();
          }
        }

        // Bind remove listeners for dev provided classed elements
        const elems = bed.getElementsByClassName('flagstone-remove');
        i = 0;
        l = elems.length;
        for (;i<l;i++) {
          elems[i].removeEventListener('click', stoneRemove);
          elems[i].addEventListener('click', stoneRemove);
        }

        // Reset to get sizes and run
        reset();

        // Run image loading checker
        if (animationDuration) {
          window.setTimeout(resetAfterImagesLoad, animationDuration);
        }

        // Run reset after first animation completes in case the scrollbar appears then.
        // This is not in the if (animationDuration) because technically an animation of zero could (possibly) have a stack delay since it's never set to "none" in the injected styles, but >= 0. But this needs to run regardless of that.
        window.setTimeout(() => {
          reset(true);
        }, animationDuration);
      }

      // RESET
      function resetQueue() {
        window.clearTimeout(resetDelay);
        resetDelay = window.setTimeout(reset, resizeDelay);
      }

      // DESTROY
      function destroy() {
        window.removeEventListener('resize', resetQueue);
      }

      // INITIALIZE
      (function() {
        hide();

        // Create styles
        if (!document.getElementById('flagstone-' + instanceIndex + '-styles')) {
          const bedStyles = '.flagstone-' + instanceIndex + '-bed{box-sizing:border-box;position:relative;min-width:' + (minWidth + (stonesMargin * 2)) + 'px;}'
          const bedAnimationStyles = '';// Turned off to not show overflowing stones while the container is still growing and a little easier on the CSS rendering engine '.flagstone-' + instanceIndex + '-bed{-webkit-transition:height ' + animationDurationSeconds + 's ' + animationTimingFunction + ';-moz-transition:height ' + animationDurationSeconds + 's ' + animationTimingFunction + ';-ms-transition:height ' + animationDurationSeconds + 's ' + animationTimingFunction + ';-o-transition:height ' + animationDurationSeconds + 's ' + animationTimingFunction + ';transition:height ' + animationDurationSeconds + 's ' + animationTimingFunction + ';}';
          const bedHiddenStyles = '.flagstone-' + instanceIndex + '-bed.flagstone-' + instanceIndex + '-bed-hidden{visibility:hidden;}';
          const stoneStyles = '.flagstone-' + instanceIndex + '-bed__stone{box-sizing:border-box;position:absolute;top:0px;' + direction + ':0px;}';
          const stoneAnimationStyles = '.flagstone-' + instanceIndex + '-bed__stone{-webkit-transition:top ' + animationDurationSeconds + 's ' + animationTimingFunction + ',left ' + animationDurationSeconds + 's ' + animationTimingFunction + ',right ' + animationDurationSeconds + 's ' + animationTimingFunction + ';-moz-transition:top ' + animationDurationSeconds + 's ' + animationTimingFunction + ',left ' + animationDurationSeconds + 's ' + animationTimingFunction + ',right ' + animationDurationSeconds + 's ' + animationTimingFunction + ';-ms-transition:top ' + animationDurationSeconds + 's ' + animationTimingFunction + ',left ' + animationDurationSeconds + 's ' + animationTimingFunction + ',right ' + animationDurationSeconds + 's ' + animationTimingFunction + ';-o-transition:top ' + animationDurationSeconds + 's ' + animationTimingFunction + ',left ' + animationDurationSeconds + 's ' + animationTimingFunction + ',right ' + animationDurationSeconds + 's ' + animationTimingFunction + ';transition:top ' + animationDurationSeconds + 's ' + animationTimingFunction + ',left ' + animationDurationSeconds + 's ' + animationTimingFunction + ',right ' + animationDurationSeconds + 's ' + animationTimingFunction + ';}';

          const styles = bedStyles + bedAnimationStyles + bedHiddenStyles + stoneStyles + stoneAnimationStyles;

          const style = document.createElement('style');
          style.type = 'text/css';
          style.id = 'flagstone-' + instanceIndex + '-styles';
          style.appendChild(document.createTextNode(styles));
          document.head.appendChild(style);
        }
        // Run reset to calculate and run FlagstoneJS!
        resetHard();
        // Set bed DOM listener
        bed.addEventListener('DOMSubtreeModified', resetHard);
        // Resize listener
        destroy();
        window.addEventListener('resize', resetQueue);

      })() // init


      // RETURN
      return {
        destroy,
        hide,
        reset: resetQueue,
        hardReset: resetHard
      }

    } // end Flagstone

    // Increment index for multiple instances
    window.flagstone.index++;

    // Return a new Flagstone instance
    return new Flagstone(devObj);

  }; // end FLAGSTONEJS

  // Set default index as property of a non-closure function.
  window.flagstone.index = -1;


})(window, document)