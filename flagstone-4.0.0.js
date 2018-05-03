/*
  FlagstoneJS v4.0.0
  (c) 2015-2018 Depth Development. http://depthdev.com
  License: MIT
*/

((window, document) => {

  'use strict';

  window.flagstone = (devElem, devObj) => {

    function Flagstone(dElem, dObj) {

      const instanceIndex = window.flagstone.index;

      const o = dObj || {};

      // FLAGSTONE (CONTAINER)
      const bed = dElem ? typeof dElem === 'string' ? document.querySelector(dElem) : dElem : document.getElementsByClassName('flagstone')[0];
      let bedPadding = o.margin || o.margin === 0 ? o.margin : o.bedPadding || o.bedPadding === 0 ? o.bedPadding : 10;
      let bedWidth = 0;
      let bedHeight = 0;
      // MIN WIDTH
      let minWidth = o.minWidth || 280;
      // COLUMNS
      let maxColumns = o.maxColumns || 5;
      let calcColumns = 0;
      let columns = 0;
      // STONES
      let stones = [];
      let stonesMargin = o.margin || o.margin === 0 ? o.margin : o.stonesMargin || o.stonesMargin === 0 ? o.stonesMargin : 10;
      let stoneWidth = (bedWidth / columns) - ((stonesMargin * (columns + 1)) / columns);
      let stoneHeights = [];
      let stonePositions = [];
      const stoneClassName = `flagstone-${instanceIndex}-bed__stone`;
      // FLOW
      const flow = o.flow;
      // DIRECTION
      const direction = o.direction ? o.direction.toLowerCase() : 'left';
      // REVERSE Z-INDEX
      const assignReverseZIndexes = o.assignReverseZIndexes;
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
      const animationDurationSeconds = o.animationDuration / 1000;
      const animationTimingFunction = o.animationTimingFunction || 'linear';
      // HEIGHT ANIMATION
      const heightAnimationDuration = o.heightAnimationDuration || 0;
      const heightAnimationDurationSeconds = o.heightAnimationDuration / 1000;
      const heightAnimationTimingFunction = o.heightAnimationTimingFunction || 'linear';
      // RESIZE/RESET DELAY
      const resizeDelay = o.resizeDelay || o.resizeDelay === 0 ? o.resizeDelay : 250;
      // SQUARE
      const square = o.square;
      // HIDE (for Developers as well when then are injecting new content onto their page, so they can hide the stones before they get a change to re-calculate);
      function hide() {
        bed.style.visibility = 'hidden';
      }
      // SHOW
      function show() {
        bed.style.visibility = 'visible';
      }
      // DRAG AND DROP
      let dragAndDrop = o.dragAndDrop;
      const dragAndDropAutoDelay = o.dragAndDropAutoDelay;
      let dropCallback = o.dropCallback || function() { return true; };
      // EVENT RESET DELAY
      const eventResetDelay = o.eventResetDelay || 0;
      // EVENT (HEIGHT) RESIZE DURATION
      const eventResizeHeightDuration = o.eventResizeHeightDuration || 0;
      let animateBedHeight = null;
      let animateBedHeightRun = false;
      let animateBedHeightTimeout = null;
      let animateMarginTopPositions = null;
      let animateMarginTopPositionsRun = false;
      let animateMarginTopPositionsTimeout = null;
      // CUSTOM
      let callback = o.callback || function() { return; };
      // WATCH
      const watch = o.watch === false ? false : true;
      const watchAll = o.watchAll;
      const watchImages = o.watchImages === false ? false : true;

      // RESET DELAY
      let resetDelay = null;
      // RESET HARD DELAY
      let resetHardDelay = null;
      let resetHard = null;

      // DRAG & DROP
      const dd = {
        targetElem: null,
        dragStone: null,
        targetStone: null,
        targetStoneOverLeft: 0,
        autoDropTimer: null,
        autoDrop() {
          if (dd.targetStone && dd.targetStone.classList.contains(stoneClassName)) {
            if (dd.targetStoneOverLeft) {
              if (dd.dragStone !== dd.targetStone.previousElementSibling) {
                dd.targetStone.parentElement.insertBefore(dd.dragStone, dd.targetStone);
                dd.targetStone.classList.remove('flagstone-left');
                dd.targetStone.classList.remove('flagstone-dragover');
              }
            } else {
              if (dd.dragStone !== dd.targetStone.nextElementSibling) {
                dd.targetStone.parentElement.insertBefore(dd.dragStone, dd.targetStone.nextElementSibling);
                dd.targetStone.classList.remove('flagstone-right');
                dd.targetStone.classList.remove('flagstone-dragover');
              }
            }
            window.clearTimeout(dd.autoDropTimer);
            dd.autoDropTimer = window.setTimeout(dd.autoDrop, dragAndDropAutoDelay);
          }
        },
        clear() {
          if (dd.dragStone) {
            dd.dragStone.classList.remove('flagstone-drag');
            dd.dragStone = null;
          }
          if (dd.targetStone) {
            dd.targetStoneOverLeft = 0;
            dd.targetStone.classList.remove('flagstone-dragover');
            dd.targetStone.classList.remove('flagstone-left');
            dd.targetStone.classList.remove('flagstone-right');
            dd.targetStone = null;
          }
          bed.classList.remove('flagstone-dragover');
        },
        getTargetElem(e) {
          dd.targetElem = e.target instanceof HTMLElement ? e.target : e.target.parentElement;
          while (dd.targetElem && !dd.targetElem.classList.contains('flagstone-drag-handle')) {
            dd.targetElem = dd.targetElem.parentElement;
          }
          if (dd.targetElem) {
            dd.dragStone = dd.targetElem;
            while (dd.dragStone && !dd.dragStone.classList.contains(stoneClassName)) {
              dd.dragStone = dd.dragStone.parentElement;
            }
          }
        },
        mouseDown(e) {
          dd.getTargetElem(e);
        },
        dragStart(e) {
          if (!dd.targetElem) { return false; }
          dd.dragStone.classList.add('flagstone-drag');
          if (e.dataTransfer) {
            e.dataTransfer.setData('text', this.id);
          }
        },
        touchStart(e) {
          dd.getTargetElem(e);
          dd.dragStart(e);
        },
        dragEnter(e) {
          // This function is only used for autoDrop()
          e.preventDefault();
          e.stopPropagation();
          if (this !== dd.dragStone && this !== dd.targetStone && this !== bed) {
            window.clearTimeout(dd.autoDropTimer);
            dd.autoDropTimer = window.setTimeout(dd.autoDrop, dragAndDropAutoDelay);
          }
        },
        touchMove(e) {
          if (!dd.dragStone) { return false; }
          e.preventDefault();
          e.stopPropagation();
          const originalElem = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
          let elem = originalElem;
          while (elem && !elem.classList.contains(stoneClassName)) {
            elem = elem.parentElement;
          }
          if (elem) {
            bed.classList.remove('flagstone-dragover');
            dd.targetStoneOverLeft = elem.getBoundingClientRect().left + (elem.offsetWidth / 2) > e.touches[0].clientX;
            if (dd.targetStone && dd.targetStone !== elem) {
              dd.targetStone.classList.remove('flagstone-dragover');
              dd.targetStone.classList.remove('flagstone-left');
              dd.targetStone.classList.remove('flagstone-right');
            }
            dd.targetStone = elem;
            if (!dd.targetStone.classList.contains('flagstone-lock')) {
              dd.targetStone.classList.add('flagstone-dragover');
              if (dd.targetStoneOverLeft) {
                dd.targetStone.classList.remove('flagstone-right');
                dd.targetStone.classList.add('flagstone-left');
              } else {
                dd.targetStone.classList.remove('flagstone-left');
                dd.targetStone.classList.add('flagstone-right');
              }
            }
          } else if (originalElem === bed) {
            dd.targetStone.classList.remove('flagstone-dragover');
            dd.targetStone.classList.remove('flagstone-left');
            dd.targetStone.classList.remove('flagstone-right');
            bed.classList.add('flagstone-dragover');
            dd.targetStone = bed;
          }
        },
        dragOver(e) {
          if (!dd.dragStone) { return false; }
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = 'move';
          if (this !== dd.dragStone && this.classList.contains(stoneClassName)) {
            dd.targetStone = this;
            dd.targetStone.classList.add('flagstone-dragover');
            dd.targetStoneOverLeft = this.getBoundingClientRect().left + (this.offsetWidth / 2) > e.clientX;
            if (dd.targetStoneOverLeft) {
              dd.targetStone.classList.remove('flagstone-right');
              dd.targetStone.classList.add('flagstone-left');
            } else {
              dd.targetStone.classList.remove('flagstone-left');
              dd.targetStone.classList.add('flagstone-right');
            }
            this.classList.remove('flagstone-dragover');
            if (dd.targetStone !== bed) {
              bed.classList.remove('flagstone-dragover');
            }
          } else if (this === bed) {
            this.classList.add('flagstone-dragover');
          }
        },
        dragEnd() {
          dd.clear();
        },
        touchEnd() {
          if (dd.dragStone && dd.targetStone && !dd.targetStone.classList.contains('flagstone-lock') && dropCallback(dd.dropStone, dd.targetStone)) {
            if (dd.targetStone === bed) {
              bed.appendChild(dd.dragStone);
            } else {
              if (dd.targetStoneOverLeft) {
                bed.insertBefore(dd.dragStone, dd.targetStone);
              } else {
                bed.insertBefore(dd.dragStone, dd.targetStone.nextElementSibling);
              }
            }
          }
          dd.clear();
        },
        dragLeave() {
          if (dd.targetStone) {
            dd.targetStone.classList.remove('flagstone-dragover');
            dd.targetStone.classList.remove('flagstone-left');
            dd.targetStone.classList.remove('flagstone-right');
            bed.classList.remove('flagstone-dragover');
          }
        },
        drop(e) {
          if (!dd.dragStone) { return false; }
          e.stopPropagation();
          window.clearTimeout(dd.autoDropTimer);
          if (dd.dragStone !== this && (this.classList.contains(stoneClassName) || this === bed)) {
            dd.targetStone = this;
            if (dd.targetStone === bed) {
              if (!dropCallback(dd.dragStone, dd.targetStone)) {
                dd.clear();
                return false;
              }
              dd.targetStone.appendChild(dd.dragStone);
            } else {
              if (dd.targetStoneOverLeft) {
                if (!dropCallback(dd.dragStone, dd.targetStone)) {
                  dd.clear();
                  return false;
                }
                dd.targetStone.parentElement.insertBefore(dd.dragStone, dd.targetStone);
              } else {
                if (!dropCallback(dd.dragStone, dd.targetStone.nextElementSibling)) {
                  dd.clear();
                  return false;
                }
                dd.targetStone.parentElement.insertBefore(dd.dragStone, dd.targetStone.nextElementSibling);
              }
            }
            dd.clear();
            if (!window.MutationObserver && (watch || watchAll)) {
              resetHard();
            }
          }
          return false;
        }
      };

      // RUN
      function run() {
        const columnHeights = [columns];
        let i = 0;
        const l = stoneHeights.length;
        stonePositions = [];
        for (;i<l;i++) {
          if (i < columns) {
              // First "row"
              if (stones[i]) {

                stones[i].style.transform = `translate(${stoneWidth * i + (i ? stonesMargin * i + bedPadding : bedPadding)}px,${bedPadding}px)`;
                
                if (square) {
                  stones[i].style.height = stones[i].style.width;
                }

                columnHeights[i] = stoneHeights[i] + bedPadding;
                callback(stones[i], i);

                stonePositions.push([stones[i]]); // For referencing when temporarily adjusting a single column

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

                stones[i].style.transform = `translate(${stoneWidth * smallestColumn + (smallestColumn ? stonesMargin * smallestColumn + bedPadding : bedPadding)}px,${smallestColumnHeight + stonesMargin}px)`;
                
                if (square) {
                  stones[i].style.height = stones[i].style.width;
                }

                columnHeights[smallestColumn] += stoneHeights[i] + stonesMargin;
                callback(stones[i], i);

                stonePositions[smallestColumn].push(stones[i]); // For referencing when temporarily adjusting a single column

              } else {
                if (columns > 1) {
                  columnHeights[smallestColumn] += stoneWidth + stonesMargin;
                }
              }
            }
            bedHeight = (Math.max.apply(null, columnHeights) || stoneHeights[0] + bedPadding) + bedPadding;
            bed.style.height = bedHeight + 'px';
          }
          window.setTimeout(show);
      } // end run()

      // RESIZE AND RESET
      function reset(pass) {
        if (!stones.length) {
          return;
        }
        // Set flagstone
        bedWidth = bed.offsetWidth;
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
            stones[i].style.marginTop = '0px';
          }
          stoneHeights.push(square || !stones[i] ? stoneWidth : stones[i].offsetHeight);
        }
        // Repeats once to resolve the possible appearence of a window scrollbar, thus affecting the width calculations
        if (bedWidth === bed.offsetWidth || pass) {
          run();
        } else {
          reset(true); // Run only one more time if width's don't match.
        }
        // Run one more time (mostly for flow widths affecting heights)
        if (!pass) {
          window.setTimeout(() => {
            reset(true);
          }, animationDuration);
        }
      }

      // EVENT STONE REMOVE
      function eventStoneRemove(e) {
        if (e.type === 'keydown') {
          if (e.keyCode !== 13 && e.keyCode !== 32) {
            return;
          }
        }
        let elem = e.target;
        while (elem && !elem.classList.contains(stoneClassName)) {
          elem = elem.parentElement;
        }
        bed.removeChild(elem);
        if (!window.MutationObserver && (watch || watchAll)) {
          resetHard();
        }
      }

      // EVENT RESET
      function eventReset(e) {
        if (e.type === 'keydown') {
          if (e.keyCode !== 13 && e.keyCode !== 32) {
            return;
          }
        }
        window.setTimeout(reset, eventResetDelay);
      }

      // RESIZE HEIGHT
      function resizeHeight(targetElem) {

        let elem = targetElem;

        while (elem && !elem.classList.contains(stoneClassName)) {
          elem = elem.parentElement;
        }
        const elemTop = window.parseInt(elem.style.transform.match(/\d+px/)[0],10) + (window.parseInt(elem.style.marginTop,10) || 0); // 65% faster than Regex replace (at least on parseInt)

        // Get stones below the target stone
        const elemsToMove = [];
        const currMarginTops = []; // From previous resizeHeight runs
        let startReferencingElems = false;

        function getElemsToMove() {
          let i = 0;
          const l = stonePositions.length;
          let ii = 0;
          let ll = 0;
          for (;i<l;i++) {
            if (startReferencingElems) {
              break; // Already got them!
            }
            ii = 0;
            ll = stonePositions[i].length;
            for (;ii<ll;ii++) {
              if (startReferencingElems) {
                elemsToMove.push(stonePositions[i][ii]);
                currMarginTops.push(window.parseInt(stonePositions[i][ii].style.marginTop,10) || 0);
              }
              if (stonePositions[i][ii] === elem) {
                startReferencingElems = true;
              }
            }
          }
        }
        getElemsToMove();


        // Animate Bed Height
        function animateBedHeightFunc() {
          let i = 0;
          const l = columns;
          const columnHeights = [];
          for (;i<l;i++) {
            const lastInColumn = stonePositions[i][stonePositions[i].length - 1];
            const h = window.parseInt(lastInColumn.style.transform.match(/\d+px/)[0],10) + (window.parseInt(lastInColumn.style.marginTop,10) || 0) + lastInColumn.offsetHeight + bedPadding;
            columnHeights.push(h);
          }
          const maxColumnHeight = Math.max.apply(null, columnHeights);
          bed.style.height = maxColumnHeight + 'px';
          animateBedHeight = window[(animateBedHeightRun ? 'request' : 'cancel') + 'AnimationFrame'](animateBedHeightFunc);
        }


        // Cancel animations
        animateBedHeightRun = false;
        window.cancelAnimationFrame(animateBedHeight);
        window.clearTimeout(animateBedHeightTimeout);

        animateMarginTopPositionsRun = false;
        window.cancelAnimationFrame(animateMarginTopPositions);
        window.clearTimeout(animateMarginTopPositionsTimeout);


        // If there aren't elements to move below, just adjust the bed height
        if (!elemsToMove.length) {

          animateBedHeightRun = true;
          animateBedHeight = window.requestAnimationFrame(animateBedHeightFunc);

          animateBedHeightTimeout = window.setTimeout(() => {
            animateBedHeightRun = false;
            window.cancelAnimationFrame(animateBedHeight);
          }, eventResizeHeightDuration);

          // Return so you don't trigger the marginTops function below
          return;
        }


        // Animate the marginTops based on the target element's height change
        function animateMarginTops() {
          const l = elemsToMove.length;
          const comparisonTop = window.parseInt(elemsToMove[0].style.transform.match(/\d+px/)[0],10) - stonesMargin + currMarginTops[0]; // Shouldn't cause reflow like offsetTop would
          function animateMarginTopPositionsFunc() {
            const comparisonDistance = elem.offsetHeight + elemTop;
            const marginTop = comparisonDistance - comparisonTop;
            // Push each element below the target down
            let i = 0;
            for (;i<l;i++) {
              elemsToMove[i].style.marginTop = marginTop + currMarginTops[i] + 'px';
            }
            animateMarginTopPositions = window[(animateMarginTopPositionsRun ? 'request' : 'cancel') + 'AnimationFrame'](animateMarginTopPositionsFunc);
          }

          // Trigger animate marginTops
          animateMarginTopPositionsRun = true;
          animateMarginTopPositions = window.requestAnimationFrame(animateMarginTopPositionsFunc);

          animateMarginTopPositionsTimeout = window.setTimeout(() => {
            animateMarginTopPositionsRun = false;
            window.cancelAnimationFrame(animateMarginTopPositions);
          }, eventResizeHeightDuration);

          // Trigger resize bed height as well
          animateBedHeightRun = true;
          animateBedHeight = window.requestAnimationFrame(animateBedHeightFunc);

          animateBedHeightTimeout = window.setTimeout(() => {
            animateBedHeightRun = false;
            window.cancelAnimationFrame(animateBedHeight);
          }, eventResizeHeightDuration);
        }
        animateMarginTops();
        
      }

      // EVENT (HEIGHT) RESIZE
      function eventResizeHeight(e) {
        if (e.type === 'keydown') {
          if (e.keyCode !== 13 && e.keyCode !== 32) {
            return;
          }
        }
        // Get target stone
        resizeHeight(e.target);
      }

      // DYNAMIC CONTENT RESET / HARD RESET
      // Note: This had to be declared earlier to avoid the "resetHard was used before it was defined"
      resetHard = () => {

        // Get stones
        stones = Array.prototype.slice.call(bed.children); // Array conversion for random/space functions
        let i = 0;
        let l = stones.length;
        // Set stone classes & option reverse z-indexes
        for (;i<l;i++) {
          stones[i].classList.add(stoneClassName);
          if (assignReverseZIndexes) {
            stones[i].style.zIndex = l - i;
          }
        }

        // Check for lazy-loaded images
        if (watchImages) {
          const images = bed.getElementsByTagName('img');
          let imagesInc = 0;
          const imagesLength = images.length;
          for (;imagesInc<imagesLength;imagesInc++) {
            // Reference both loading images and those that haven't had their sources set yet
            // Don't need to check for .complete even with the IE issue
            if (!images[imagesInc].naturalWidth) {
              images[imagesInc].removeEventListener('load', reset);
              images[imagesInc].addEventListener('load', reset);
              images[imagesInc].removeEventListener('error', reset);
              images[imagesInc].addEventListener('error', reset);
            }
          }
        }

        // Remove drag and drop listeners always, to support optional toggling of drag and drop
        i = 0;
        for (;i<l;i++) {
          stones[i].removeAttribute('draggable');

          stones[i].removeEventListener('mousedown', dd.mouseDown);
          stones[i].removeEventListener('dragstart', dd.dragStart);
          stones[i].removeEventListener('touchstart', dd.touchStart);
          stones[i].removeEventListener('touchmove', dd.touchMove);
          stones[i].removeEventListener('dragover', dd.dragOver);
          stones[i].removeEventListener('dragleave', dd.dragLeave);
          stones[i].removeEventListener('dragend', dd.dragEnd);
          stones[i].removeEventListener('touchend', dd.touchEnd);
          stones[i].removeEventListener('drop', dd.drop);
          stones[i].removeEventListener('touchend', dd.drop);

          stones[i].removeEventListener('dragenter', dd.dragEnter);
          
        }

        bed.removeEventListener('dragover', dd.dragOver);
        bed.removeEventListener('drop', dd.drop);

        // Bind drag and drop listeners
        if (dragAndDrop) {
          i = 0;
          for (;i<l;i++) {

            // Skip if stone has lock class
            if (stones[i].classList.contains('flagstone-lock')) { continue; }

            stones[i].setAttribute('draggable', 'true');

            stones[i].addEventListener('mousedown', dd.mouseDown);
            stones[i].addEventListener('dragstart', dd.dragStart);
            stones[i].addEventListener('touchstart', dd.touchStart);
            stones[i].addEventListener('touchmove', dd.touchMove);
            stones[i].addEventListener('dragover', dd.dragOver);
            stones[i].addEventListener('dragleave', dd.dragLeave);
            stones[i].addEventListener('dragend', dd.dragEnd);
            stones[i].addEventListener('touchend', dd.touchEnd);
            stones[i].addEventListener('drop', dd.drop);
            stones[i].addEventListener('touchend', dd.drop);

            if (dragAndDropAutoDelay) {
              stones[i].addEventListener('dragenter', dd.dragEnter);
            }
            if (!stones[i].getElementsByClassName('flagstone-drag-handle').length) {
              stones[i].classList.add('flagstone-drag-handle');
            }

          }

          bed.addEventListener('dragover', dd.dragOver);
          bed.addEventListener('drop', dd.drop);
        }

        // Random/space setup
        if (random || space) {
          if (random) {
            stones.sort(() => 0.5 - Math.random());
          }
          if (space) {
            spaceGenerator();
          }
        }

        // Bind remove listeners for dev provided classed elements
        let elems = bed.getElementsByClassName('flagstone-remove');
        i = 0;
        l = elems.length;
        for (;i<l;i++) {
          elems[i].removeEventListener('click', eventStoneRemove);
          elems[i].addEventListener('click', eventStoneRemove);
          elems[i].removeEventListener('keydown', eventStoneRemove);
          elems[i].addEventListener('keydown', eventStoneRemove);
        }

        // Bind reset listeners for dev provided classed elements
        elems = bed.getElementsByClassName('flagstone-reset');
        i = 0;
        l = elems.length;
        for (;i<l;i++) {
          elems[i].removeEventListener('click', eventReset);
          elems[i].addEventListener('click', eventReset);
          elems[i].removeEventListener('keydown', eventReset);
          elems[i].addEventListener('keydown', eventReset);
        }

        // Bind height resize listeners for dev provided classed elements
        elems = bed.getElementsByClassName('flagstone-resize-height');
        i = 0;
        l = elems.length;
        for (;i<l;i++) {
          elems[i].removeEventListener('click', eventResizeHeight);
          elems[i].addEventListener('click', eventResizeHeight);
          elems[i].removeEventListener('keydown', eventResizeHeight);
          elems[i].addEventListener('keydown', eventResizeHeight);
        }

        // Reset to get sizes and run
        reset();

        // Run reset after first animation completes in case the scrollbar appears then.
        // This is not in the if (animationDuration) because technically an animation of zero could (possibly) have a stack delay since it's never set to "none" in the injected styles, but >= 0. But this needs to run regardless of that.
        window.setTimeout(() => {
          reset(true);
        }, animationDuration);
      }

      // RESET QUEUE
      function resetQueue() {
        window.clearTimeout(resetDelay);
        resetDelay = window.setTimeout(reset, resizeDelay);
      }

      // RESET HARD QUEUE
      function resetHardQueue() {
        window.clearTimeout(resetHardDelay);
        resetHardDelay = window.setTimeout(resetHard);
      }

      // DESTROY
      function destroy() {
        window.removeEventListener('resize', resetQueue);
        document.head.removeChild(document.getElementById(`flagstone-${instanceIndex}-styles`));
      }

      // ADJUST
      function adjust(adjustObj) {
        if (adjustObj.margin || adjustObj.margin === 0) {
          bedPadding = adjustObj.margin;
          stonesMargin = adjustObj.margin;
        } else {
          bedPadding = adjustObj.bedPadding || bedPadding;
          stonesMargin = adjustObj.stonesMargin || stonesMargin;
        }
        minWidth = adjustObj.minWidth || minWidth;
        maxColumns = adjustObj.maxColumns || maxColumns;
        dragAndDrop = adjustObj.dragAndDrop === true || adjustObj.dragAndDrop === false ? adjustObj.dragAndDrop : dragAndDrop;
        dropCallback = adjustObj.dropCallback || dropCallback;
        callback = adjustObj.callback || callback;
        resetHard();
      }

      // INITIALIZE
      (() => {

        hide();

        // Set bed class
        bed.classList.add(`flagstone-${instanceIndex}-bed`);

        // Create styles
        if (!document.getElementById(`flagstone-${instanceIndex}-styles`)) {
          const bedStyles = `.flagstone-${instanceIndex}-bed{box-sizing:border-box;list-style-type:none;overflow:hidden;position:relative;min-width:${(minWidth + (bedPadding * 2))}px;}`;
          const stoneStyles = `.flagstone-${instanceIndex}-bed__stone{box-sizing:border-box;position:absolute;top:0px;${direction}:0px;margin:0;}`;
          const stoneAnimationStyles = `.flagstone-${instanceIndex}-bed__stone{transition:transform ${animationDurationSeconds}s ${animationTimingFunction}${flow ? `,width ${animationDurationSeconds}s ${animationTimingFunction}` : ''}${heightAnimationDuration ? `,height ${heightAnimationDurationSeconds}s ${heightAnimationTimingFunction}` : ''};}`;

          const styles = bedStyles + stoneStyles + stoneAnimationStyles;

          const style = document.createElement('style');
          style.type = 'text/css';
          style.id = `flagstone-${instanceIndex}-styles`;
          style.appendChild(document.createTextNode(styles));
          document.head.appendChild(style);
        }
        // Run reset to calculate and run FlagstoneJS!
        resetHard();
        // Resize listener
        window.removeEventListener('resize', resetQueue);
        window.addEventListener('resize', resetQueue);
        // Set bed DOM listener
        if (window.MutationObserver && (watch || watchAll)) {
          const mo = new window.MutationObserver(resetHardQueue);
          // "TypeError: Failed to execute 'observe' on 'MutationObserver':
          // The options object may only set 'attributeFilter' when 'attributes' is true or not present."
          // Hence the need of the `if` statement instead of inline evaluations on a single object.
          if (watchAll && watchImages) {
            mo.observe(bed, {
              childList: true,
              subtree: true,
              attributes: true,
              attributeFilter: ['src']
            });
          } else {
            mo.observe(bed, {
              childList: true,
              subtree: watchAll
            });
          }
        }

      })(); // init


      // RETURN
      return {
        adjust,
        destroy,
        resizeHeight,
        hide,
        reset: resetQueue,
        hardReset: resetHard
      }

    } // end Flagstone

    // Increment index for multiple instances
    window.flagstone.index++;

    // Return a new Flagstone instance
    return new Flagstone(devElem, devObj);

  }; // end FLAGSTONEJS

  // Set default index as property of a non-closure function.
  window.flagstone.index = -1;


})(window, document);
