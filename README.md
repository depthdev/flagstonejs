<h1>FlagstoneJS</h1>
<h2>"Responsive Tiling"</h2>
<a href="http://codepen.io/clearwavedesigns/full/vNWpGM" target="_blank">
  <img src="http://cdn.clearwavedesigns.com/flagstonejs-2.1.jpg" alt="FlagstoneJS 2.1"/>
</a>
<br/>
<p><strong>Current Version:</strong> 2.1.20150803 (version 1.3 reloaded with many more options)</p>
<p><strong>Deprecated Versions:</strong> 2.0 &#38; 1.3</p>
<hr/>
<h3>Responsively positions HTML elements left or right and top to bottom, regardless of content size; and, comes with many additional features and options.</h3>
<br/>
<p><a href="http://codepen.io/clearwavedesigns/full/vNWpGM" target="_blank">2.1 Live demo</a> (Reloaded with many more options. No dependencies. CSS-only animation)</p>
<br/>
<hr/>
<p><a href="http://codepen.io/clearwavedesigns/full/QbVLgQ" target="_blank">1.3 Live demo</a> (No dependencies with CSS-only animation)</p>
<p><a href="http://codepen.io/clearwavedesigns/full/gbOrvR" target="_blank">1.3-jquery Live demo</a> (jQuery dependent with optional jQuery animation instead of default CSS animation)</p>
<img src="http://cdn.clearwavedesigns.com/flagstonejs-1.3.jpg" alt="FlagstoneJS 1.3"/>
<br/>
<br/>
<br/>

<small>COPYRIGHT (C) 2014-2015 by CLEARWAVE DESIGNS, LLC.</small>

<ul>
  <li>Name (official): FlagstoneJS</li>
  <li>Names (alternative): Flagstone or flagstone.js</li>
  <li>Slogan: "Responsive tiling."</li>
</ul>
<br/>
<article>
  <h3>HTML</h3>
  <p>This example shows the default selectors as attributes, but <em>any</em> selector can be used on any HTML structure:</p>
  <p>&lt;ul flagstones&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
  <p>&lt;/ul&gt;</p>
</article>
<br/>
<article>
  <h3>JavaScript</h3>
  <p>Initialize a Flagstone instance and pass in the <em>optional</em> settings.</p>
  <code>
   <p><strong>var fs = new FLAGSTONE();</strong></p>
   <p>-OR-</p>
    <p><strong>var fs = new FLAGSTONE({</strong></p>
      <p><strong>&#160;&#160;area: '.js-floor',</strong> <em>// Wrapping element (as a selector string)</em></p>
      <p><strong>&#160;&#160;areaMargin: 10,</strong> <em>// The padding around the area edge in pixels (as an int)</em></p>
      <p><strong>&#160;&#160;flagstones: '.js-tile',</strong> <em>// Tilable elements (as a selector string)</em></p>
      <p><strong>&#160;&#160;flagstonesMargin: 10,</strong> <em>// Margin between flagstones in pixels (as an int)</em></p>
      <p><strong>&#160;&#160;margin: 10,</strong> <em>// This overrides areaMargin & flagstoneMargin and is equivalent to setting them both to this value</em></p>
      <p><strong>&#160;&#160;minWidth: 300,</strong> <em>// Minimum width you want the tilable elements (pixels as int)</em></p>
      <p><strong>&#160;&#160;maxColumns: 5,</strong> <em> // Maximum number of columns to display (as an int)</em></p>
      <p><strong>&#160;&#160;direction: 'left',</strong> <em>// Alternative is "right"; the default is "left"; and for top to bottom, use CSS's built in Columns or Flexbox</em></p>
      <p><strong>&#160;&#160;random: false,</strong> <em>// Display flagstones in a random order; the default is false (as a boolean)</em></p>
      <p><strong>&#160;&#160;square: false,</strong> <em>// Makes each flagstone square; default is false</em></p>
      <p><strong>&#160;&#160;space: false,</strong> <em>// Spaces out flagstones randomly (as a boolean)</em></p>
      <p><strong>&#160;&#160;spaceFrequency: 0.4,</strong> <em>// Adjusts the frequency of the amount of spaces (as a float 0.0 - 1.0); default is 0.4</em></p>
      <p><strong>&#160;&#160;duration: 2000,</strong> <em>// Animation duration, or 0 for none (milliseconds as an int)</em></p>
      <p><strong>&#160;&#160;jqueryAnimation: false,</strong> <em>// NOTE: Only available on version 1.3 with jQuery support. If true, jQuery animation will be used instead of CSS animation; but it's very slow! (as a boolean)</em></p>
      <p><strong>&#160;&#160;resizeDelay: 250,</strong> <em>// Delay running the reset function while resizing the window  (milliseconds as an int)</em></p>
      <p><strong>&#160;&#160;custom: function(index, elem) {</strong></p>
      <p>&#160;&#160;&#160;&#160;if (index === 3) {</p>
      <p>&#160;&#160;&#160;&#160;&#160;&#160;elem.className = 'highlight';</p>
      <p>&#160;&#160;&#160;&#160;} else {</p>
      <p>&#160;&#160;&#160;&#160;&#160;&#160;elem.className = '';</p>
      <p>&#160;&#160;&#160;&#160;}</p>
      <p>&#160;&#160;<strong>}</strong> <em>// Callback function for each element with index and element arguments</em></p>
    <p><strong>});</strong></p>
  </code>
</article>
<br/>
<article>
  <h3>Reset Options (for dynamic content)</h3>
  <br/>
  <p>Soft reset: <strong>fs.reset();</strong> <em>// Simple and quick reset. This is ideal for when one or more flagstone's content grows after the initial run.</em></p>
  <p>Hard reset: <strong>fs.hardReset();</strong> <em>// For dynamically added/removed flagstones. This requires all elements to be re-referenced and re-calculated.</em></p>
  <p>Hide: <strong>fs.hide();</strong> <em>// Hides the flagstone wrapper until re-calculation is complete; great before new content is injected into the DOM.</em></p>
  <br/>
  <p>NOTE: If ng-src is used via AngularJS, you will need to provide a load directive and call the <em>soft reset</em> on the callback.</p>
  <p>NOTE: If elements are injected onto the page after the plugin has been initialized, you will need to call the <em>hard reset</em>.</p>
</article>
