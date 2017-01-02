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

const fs = flagstone({  
  **elem:** document.getElementsByTagName('article')[0], // Wrapping element  
  //bedPadding: 10, // The padding around the area edge in pixels (as an int)  
  //stonesMargin: 10, // Margin between stones in pixels (as an int)  
  margin: 10, // This overrides areaMargin & flagstonePadding and is equivalent to setting them both to this value  
  minWidth: 280, // Minimum width you want an element to be in pixels (as an int)  
  maxColumns: 5, // Maximum number of columns to display (as an int)  
  direction: 'left', // Alternative is "right"; the default is "left"; and for top to bottom, use CSS's built in Columns or Flexbox  
  random: false, // Display stones in a random order; the default is false (as a boolean)  
  square: false, // Makes each flagstone square; default is false  
  space: false, // Spaces out stones randomly (as a boolean)  
  spaceFrequency: 0.4, // Adjusts the frequency of the amount of spaces (as a float 0.0 - 1.0); default is 0.4  
  animationDuration: 1000, // Animation duration (milliseconds as an int); default is 0  
  animationTimingFunction: 'ease', // CSS animation timing function as a string  
  resizeDelay: 250, // Delay to run resize/reset function after resizing the window in milliseconds (as an int); default is 250  
  imagesLoadedQueryDuration: 2500,  
  imagesLoadedQueryFrequency: 100,  
  dragAndDrop: true,  
  eventResetDelay: 250,  
  callback: function(elem, index) { // Warning! This gets called every soft reset, so if you're attaching listeners, you'll need to remove the listeners first!
    if (index === 3) {
      elem.classList.add('highlight');
    } else {
      elem.classList.remove('highlight');
    }
  } // Callback function for each element with index and element arguments
});





// METHODS:

// ADJUST
  // fs.adjust({
  //   margin: 10,
  //   bedPadding: 10,
  //   stonesMargin: 10,
  //   minWidth: 280,
  //   maxColumns: 5,
  //   square: false,
  //   dragAndDrop: true,
  //   callback: function() {}
  // });

// DESTROY | fs.destroy(); // Removes window resize event listener for the given Flagstone instance.

// SOFT RESET | fs.reset(); // Good for adjusting static content.

// HARD RESET | fs.hardReset(); // Great for dynamic content such and Angular, AJAX or other injected content.

// HIDE | fs.hide(); // Hides the flagstone wrapper until re-calculation is complete; great before new content is injected into the DOM.

/* Example styling for drag and drop
  .flagstone-0-bed.flagstone-dragover {
    box-shadow: inset 0 0 4px 4px $yellow;
  }
  .flagstone-drag {
    filter: grayscale(1) blur(4px);
    opacity: 0.25;
  }
  .flagstone-left {
    box-shadow: -8px 0 4px -4px $yellow;
  }
  .flagstone-right {
    box-shadow: 8px 0 4px -4px $yellow;
  }
  */
