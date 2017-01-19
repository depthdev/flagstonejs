# FlagstoneJS
<summary>Dynamic &#38; responsive tiling, with drag &#38; drop, and touch support.</summary>

[Demo](http://codepen.io/depthdev/pen/pNMOdd)

<a href="http://codepen.io/depthdev/full/pNMOdd/" target="_blank"><img src="http://cdn.depthdev.com/flagstone-3.7.1-screenshot.png"></a>

## Docs

### Download the ES5 minified version, or ES6 expanded version.

---

### Optional Recommended Actions
* For instances with large amounts of "stones," it's recommended that you hard code this attribute and style to the Flagstone element: `style="visibility:hidden;"`.  
* For a quicker visual setup, make sure the webpage *always* or *never* has a scrollbar.

---

### Instantiate 1 or more Flagstone instances
NOTE: Calling `flagstone()` returns a new Flagstone instance.

`const fs = flagstone(); // Requires the wrapper element to have a class of ".flagstone" on it.`

OR

`const fs = flagstone(document.getElementsByTagName('article')[1]); // Pass in the element to bootstrap`

OR

<sub>
**const fs = flagstone({**  
  &#160;&#160;&#160;&#160;**elem:** document.getElementsByTagName('article')[0], *// Wrapping element*  
  &#160;&#160;&#160;&#160;**bedPadding:** 10, *// The padding around the area edge*  
  &#160;&#160;&#160;&#160;**stonesMargin:** 10, *// Margin between stones*  
  &#160;&#160;&#160;&#160;**margin:** 10, *// This overrides bedPadding &#38; stonesMargin and is equivalent to setting them both to this value*  
  &#160;&#160;&#160;&#160;**minWidth:** 280, *// Minimum width you want an element to be*  
  &#160;&#160;&#160;&#160;**maxColumns:** 5, *// Maximum number of columns to display*  
  &#160;&#160;&#160;&#160;**flow:** false, *// Flows the stone widths on resize; but, harder to read flowing text during animation*  
  &#160;&#160;&#160;&#160;**direction:** 'left', *// Alternative is "right"*  
  &#160;&#160;&#160;&#160;**assignReverseZIndexes:** false, *// Auto DOM order z-indexing, or `true` for each stone to have a higher z-index than the next stone*  
  &#160;&#160;&#160;&#160;**random:** false, *// Display stones in a random order*  
  &#160;&#160;&#160;&#160;**square:** false, *// Makes each flagstone square*  
  &#160;&#160;&#160;&#160;**space:** false, *// Spaces out stones randomly*  
  &#160;&#160;&#160;&#160;**spaceFrequency:** 0.4, *// Adjusts the frequency of the amount of spaces (as a float 0.0 - 1.0)*  
  &#160;&#160;&#160;&#160;**animationDuration:** 0, *// Animation duration (milliseconds)*  
  &#160;&#160;&#160;&#160;**animationTimingFunction:** 'linear', *// CSS animation timing function as a string*  
  &#160;&#160;&#160;&#160;**heightAnimationDuration:** 0, *// Height animation duration (milliseconds)*  
  &#160;&#160;&#160;&#160;**heightAnimationTimingFunction:** 'linear', *// Height CSS animation timing function as a string*  
  &#160;&#160;&#160;&#160;**resizeDelay:** 250, *// Delay to run resize/reset function after resizing the window (milliseconds)*  
  &#160;&#160;&#160;&#160;**imagesLoadedQueryDuration:** 2500, *// Duration to check for images that have finished loading after instantiation (milliseconds).*  
  &#160;&#160;&#160;&#160;**imagesLoadedQueryFrequency:** 100, *// Frequency to check for images that have loaded within the imagesLoadedQueryDuration (milliseconds)*  
  &#160;&#160;&#160;&#160;**dragAndDrop:** false, *// Enable drag n' drop*  
  &#160;&#160;&#160;&#160;**dragAndDropAutoDelay:** 0, *// Enable automatic/previewing drag n' drop by setting a delay (milliseconds)*  
  &#160;&#160;&#160;&#160;**dropCallback:** function(dragElem, targetElem) { return true; }, *// Drag and drop callback to manipulate the drag and target elements as well as accept or reject the drop with a return boolean*  
  &#160;&#160;&#160;&#160;**eventResetDelay:** 0, *// Delay to call reset when an element with the "flagstone-reset" class is triggered (important when resizing CSS animations are used)*  
  &#160;&#160;&#160;&#160;**eventResizeHeightDuration:** 0, *// Animation duration when an element with the "flagstone-resize-height" class is triggered. (Important when resizing CSS animations are used and you don't want a reset to be called) (milliseconds). Increase time slightly if needed to compensate for event binding order.*  
  &#160;&#160;&#160;&#160;**callback:** function(elem, index) {}, *// Callback to run against every element every time a soft reset is called. WARNING: If attaching listeners, you'll need to remove the listeners first to avoid stacks of listeners!*  
  &#160;&#160;&#160;&#160;**watch:** true, *// Calls a hard reset when a stone is added or removed*  
  &#160;&#160;&#160;&#160;**watchAll:** false *// Calls a hard reset when any element in the Flagstone bed is added or removed (not supported in <= IE10)*  
**});**
</sub>

---

### METHODS:

#### ADJUST
Allows the developer to provide options to the user to change settings on the fly.  
**fs.adjust({**  
&#160;&#160;&#160;&#160;**margin:** 10,  
&#160;&#160;&#160;&#160;**bedPadding:** 10,  
&#160;&#160;&#160;&#160;**stonesMargin:** 10,  
&#160;&#160;&#160;&#160;**minWidth:** 280,  
&#160;&#160;&#160;&#160;**maxColumns:** 5,  
&#160;&#160;&#160;&#160;**dragAndDrop:** true,  
&#160;&#160;&#160;&#160;**dropCallback:** function(elem, index) {},  
&#160;&#160;&#160;&#160;**callback:** function(elem, index) {}  
**});**

#### DESTROY
Removes Window resize event listener, and removes the styles from the document head.  
**fs.destroy();**

#### HIDE
Hides the flagstone wrapper until re-calculation is complete; great before new content is injected into the DOM. IMPORTANT: Generally speaking, most use cases are handled automatically.  
**fs.hide();**

#### RESET (Soft)
Re-calculates sizes and spacing of existing stones. This is handled automatically on resize, and when an element with a class of `flagstone-reset` is selected.  
**fs.reset();** // Good for adjusting static content.

#### RESET (Hard)
Finds stones anew, adds any applicable listeners, and resets all positions. IMPORTANT: In most cases, this will never be needed as DOM changes are being listened for already and will call this method automatically.  
**fs.hardReset();**

#### RESIZE HEIGHT
Runs a watcher to move the elements directly under the provided element's ancestor stone element. See the `flagstone-resize-height` class for more details.  
**fs.resizeHeight(*element*);**

---

### CLASSES

#### flagstone-drag-handle
Elements with the `flagstone-drag-handle` class on them designate the only drag-activating area. This can also be added to the stone itself if you want the entire stone to be draggable from anywhere on it. NOTE: This is required for drag and drop. This requires the `dragAndDrop` property to be set to `true` to function.

#### flagstone-lock
Stones with the `flagstone-lock` class on them will prevent them from being dragged, or from other stones being dragged over them&#8212;even if the `dragAndDrop` property is set to `true`.

#### flagstone-remove
Elements with the `flagstone-remove` class on them will cause the stone it's contained within to be removed from the DOM when *clicked*; or, when the *enter* or *space* keys are pressed.

#### flagstone-reset
Elements with the `flagstone-reset` class on them will trigger a soft reset when *clicked*; or, when the *enter* or *space* keys are pressed.

#### flagstone-resize-height
Elements with the `flagstone-resize-height` class on them will cause "stones" below it to move with the developer-provided height changes of this targeted stone when *clicked*; or, when the *enter* or *space* keys are pressed.  

IMPORTANT: Size changes cannot be read accurately if and when Flagstone listeners attach *after* your developer resize function listeners. To fix this issue, set your methods in a timeless `setTimeout` callback, and set the Flagstone `eventResizeHeightDuration` property to the animation duration your CSS or JS animation will be running for.

---

### DRAG AND DROP

#### Handle
Add a `flagstone-drag-handle` class anywhere on or inside a stone to limit where the drag behavior is allowed.

#### Lock
Prevent one or more stones from dragging even when `dragAndDrop` is set to `true` by adding a `flagstone-lock` class to them.

#### Classes conditionally added to the *bed* wrapper:
* `flagstone-dragover` *Applied when a stone is dragged over the bed, and not a another stone*

#### Classes conditionally added to the *stone* elements:
* `flagstone-drag` *Applied when the drag starts*
* `flagstone-dragover` *Applied to the stone that's under the dragging mouse/touch*
* `flagstone-left` *Applied when the dragging mouse/touch is on the left side of a another stone; suggesting the future drop position*
* `flagstone-right` *Applied when the dragging mouse/touch is on the right side of a another stone; suggesting the future drop position*

#### Example styling for drag and drop:
**.a-class-on-your-flagstone-bed.flagstone-dragover {**  
&#160;&#160;&#160;&#160;box-shadow: inset 0 0 4px 4px #ff0;  
**}**  
**.flagstone-drag {**  
&#160;&#160;&#160;&#160;filter: grayscale(1) blur(4px);  
&#160;&#160;&#160;&#160;opacity: 0.25;  
**}**  
**.flagstone-left {**  
&#160;&#160;&#160;&#160;box-shadow: -8px 0 4px -4px #ff0;  
**}**  
**.flagstone-right {**  
&#160;&#160;&#160;&#160;box-shadow: 8px 0 4px -4px #ff0;  
**}**

---

### ADDITIONAL ANIMATION
Because of CSS cascading:
* Any of your transition styles declared before the injected Flagstone styles appended to the head element will be replaced.
* If adding transition styles *after* the Flagstone styles, you must also *re-add* the Flagstone generated styles.

---

### BROWSER SUPPORT
Modern browsers (including IE10+) and mobile support.
