# FlagstoneJS
## Dynamic &#38; responsive tiling

[Demo](http://codepen.io/depthdev/pen/pNMOdd)

<a href="http://codepen.io/depthdev/full/pNMOdd/" target="_blank"><img src="http://cdn.depthdev.com/flagstone-3.0.0-screenshot.png"></a>

## Docs

### Download the ES5 minified version, or ES6 expanded version.

### Instantiate a Flagstone instance

`const fs = flagstone(); // Requires the wrapper element to have a class of ".flagstone" on it.`

OR

`const fs = flagstone(document.getElementsByTagName('article')[1]); // Pass in the element to bootstrap`

OR

*(NOTE: Values below represent the default values)*  
**const fs = flagstone({**  
  &#160;&#160;&#160;&#160;**elem:** document.getElementsByTagName('article')[0], *// Wrapping element*  
  &#160;&#160;&#160;&#160;**bedPadding:** 10, *// The padding around the area edge*  
  &#160;&#160;&#160;&#160;**stonesMargin:** 10, *// Margin between stones*  
  &#160;&#160;&#160;&#160;**margin:** 10, *// This overrides bedPadding &#38; stonesMargin and is equivalent to setting them both to this value*  
  &#160;&#160;&#160;&#160;**minWidth:** 280, *// Minimum width you want an element to be*  
  &#160;&#160;&#160;&#160;**maxColumns:** 5, *// Maximum number of columns to display*  
  &#160;&#160;&#160;&#160;**direction:** 'left', *// Alternative is "right"*  
  &#160;&#160;&#160;&#160;**random:** false, *// Display stones in a random order*  
  &#160;&#160;&#160;&#160;**square:** false, *// Makes each flagstone square*  
  &#160;&#160;&#160;&#160;**space:** false, *// Spaces out stones randomly*  
  &#160;&#160;&#160;&#160;**spaceFrequency:** 0.4, *// Adjusts the frequency of the amount of spaces (as a float 0.0 - 1.0)*  
  &#160;&#160;&#160;&#160;**animationDuration:** 0, *// Animation duration (milliseconds)*
  &#160;&#160;&#160;&#160;**animationTimingFunction:** 'linear', *// CSS animation timing function as a string*  
  &#160;&#160;&#160;&#160;**resizeDelay:** 250, *// Delay to run resize/reset function after resizing the window (milliseconds)*  
  &#160;&#160;&#160;&#160;**imagesLoadedQueryDuration:** 2500, *// Duration to check for images that have finished loading after instantiation (milliseconds).*  
  &#160;&#160;&#160;&#160;**imagesLoadedQueryFrequency:** 100, *// Frequency to check for images that have loaded within the imagesLoadedQueryDuration (milliseconds)*  
  &#160;&#160;&#160;&#160;**dragAndDrop:** false, *// Enable drag n' drop*  
  &#160;&#160;&#160;&#160;**eventResetDelay:** 0, *// Delay to call reset when an element with "flagstone-reset" is triggered (important when resizing CSS animations are used)*  
  &#160;&#160;&#160;&#160;**callback:** function(elem, index) {} *// Callback to run against every element every time a soft reset is called. WARNING: If attaching listeners, you'll need to remove the listeners first to avoid stacks of listeners!*  
**});**


### METHODS:

#### Adjust
**fs.adjust({**
&#160;&#160;&#160;&#160;**margin:** 10,  
&#160;&#160;&#160;&#160;**bedPadding:** 10,  
&#160;&#160;&#160;&#160;**stonesMargin:** 10,  
&#160;&#160;&#160;&#160;**minWidth:** 280,  
&#160;&#160;&#160;&#160;**maxColumns:** 5,  
&#160;&#160;&#160;&#160;**square:** false,  
&#160;&#160;&#160;&#160;**dragAndDrop:** true,  
&#160;&#160;&#160;&#160;**callback:** function(elem, index) {}  
**});**

#### DESTROY
Removes attached Window event listeners.  
**fs.destroy();**

#### RESET (Soft)
Re-calculates sizes and spacing of existing stones.  
**fs.reset();** // Good for adjusting static content.

#### RESET (Hard)
Finds stones anew, adds any applicable listeners, and resets all positions.  
**fs.hardReset();**

#### HIDE
Hides the flagstone wrapper until re-calculation is complete; great before new content is injected into the DOM.  
**fs.hide();**

### Other
#### Example styling for drag and drop
**.flagstone-0-bed.flagstone-dragover {**  
&#160;&#160;&#160;&#160;box-shadow: inset 0 0 4px 4px #fff;  
**}**  
**.flagstone-drag {**  
&#160;&#160;&#160;&#160;filter: grayscale(1) blur(4px);  
&#160;&#160;&#160;&#160;opacity: 0.25;  
**}**  
**.flagstone-left {**  
&#160;&#160;&#160;&#160;box-shadow: -8px 0 4px -4px #fff;  
**}**  
**.flagstone-right {**  
&#160;&#160;&#160;&#160;box-shadow: 8px 0 4px -4px #fff;  
**}**
