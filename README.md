<h1><a href="http://codepen.io/clearwavedesigns/pen/gbOrvR" target="_blank">FlagstoneJS</a></h1>
<h2>responsive tiling</h2>
<p>Responsively tiles HTML elements left to right, top to bottom, and where there's the most room.</p>
<p><a href="http://codepen.io/clearwavedesigns/pen/gbOrvR" target="_blank">Live demo</a></p>

<small>COPYRIGHT (C) 2014 by CLEARWAVE DESIGNS, LLC.  All rights reserved.</small>

<ul>
  <li>Name (official): FlagstoneJS</li>
  <li>Names (alternative): Flagstone or flagstone.js</li>
  <li>Slogan: "Responsive tiling."</li>
</ul>

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

<article>
  <h3>JavaScript</h3>
  <p>Initialize a Flagstone instance and pass in the <em>optional</em> properties</p>
  <code>
   <p><strong>var fs = new FLAGSTONE();</strong></p>
   <p>OR</p>
    <p><strong>var fs = new FLAGSTONE({</p>
      <p><strong>&#160;&#160;area: '.js-floor',</strong> <em>// Wrapping element (as a selector string)</em></p>
      <p><strong>&#160;&#160;flagstones: '.js-tile',</strong> <em>// Tilable elements (as a selector string)</em></p>
      <p><strong>&#160;&#160;minWidth: 300,</strong> <em>// Minimum width you want the tilable elements (pixels as int)</em></p>
      <p><strong>&#160;&#160;maxColumns: 2,</strong> <em> // Maximum number of columns to display (as an int)
      <p><strong>&#160;&#160;margin: 10,</strong> <em>// Margin between tilable elements (pixels as an int)</em></p>
      <p><strong>&#160;&#160;duration: 2000,</strong> <em>// Animation duration  (milliseconds as an int)</em></p>
      <p><strong>&#160;&#160;resizeDelay: 250</strong> <em>// Delay running the reset function while resizing the window  (milliseconds as an int)</em></p>
    <p><strong>});</p>
  </code>
  
  <p><em>Soft reset: <strong>fs.reset();</strong></em></p>
  <p><em>Hard reset: <strong>fs.hardReset();</strong></em> // For dynamic content such as an AngularJS callback, or any other injected content.</p>
</article>
