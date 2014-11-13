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
  <p>Initialize a Flagstone instance and pass in the required properties</p>
  <code>
   <p>var fs = new FLAGSTONE();</p>
   <p>OR</p>
    <p>var fs = new FLAGSTONE({</p>
      <p>&#160;&#160;area: $('.js-floor'), <em>// Wrapping element</em></p>
      <p>&#160;&#160;flagstones: $('.js-tile'), <em>// Tilable elements</em></p>
      <p>&#160;&#160;minWidth: 300, <em>// Minimum width you want the tilable elements (pixels as int)</em></p>
      <p>&#160;&#160;margin: 10 <em>// Margin between tilable elements (pixels as int)</em></p>
      <p>&#160;&#160;duration: 2000 <em>// Animation duration  (milliseconds as int)</em></p>
    <p>});</p>
  </code>
  
  <p><em>If using AngularJS, you can use the "reset" method during your callback; i.e. fs.reset();</em></p>
</article>
