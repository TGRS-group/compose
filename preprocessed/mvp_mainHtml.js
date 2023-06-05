//+ mainHtml {"type": "html", "target": "default"}
//  <h1>Compose</h1>
//  <div style="display: flex; flex-direction: row;">
//  <div style="flex: 1;">
// <h2>Code</h2>
//  </div>
//  <div style="flex: 1;">
// <h2>Output</h2>
//  </div>
//  </div>
//  <div style="display: flex; flex-direction: row;">
//  <div style="flex: 1;">
// <fieldset>
//  <legend>Edit</legend>
//  <input type="radio" name="mode" value="block" id="block" checked>
//  <label for="block">Block</label>
//  <input type="radio" name="mode" value="wholeScript" id="whole script">
//  <label for="whole script">Whole script</label>
//  <input type="radio" name="mode" value="restore" id="restore">
//  <label for="restore">Restore from</label>
//  <br>
//  <select id="blockNames" style="display: none;"> </select>
//  <select id="checkpoints" style="display: none;"> </select>
// </fieldset>
//  <textarea id="editor" style="height: 16ch; width: 100%; box-sizing: border-box;"></textarea>
// <div style="display: flex; flex-direction: row;">
// <div style="flex: 1; display: flex;">
// <fieldset>
//  <legend>Storage</legend>
//  <button id="store">store</button>
//  <button id="clearLabel">clear label history</button>
//  <button id="clearAll">wipe entire history</button>
//  <br>
//  Label: <input type="text" id="label" value="default" style="margin: 5px;">
//  </fieldset>
//  </div>
//  <div style="flex: 1;">
// <fieldset style="height: 100%;">
//  <legend>Execution</legend>
//  <button id="execute" style="float: right;">store and execute</button>
// </fieldset>
// </div>
//  </div>
//  </div>
//  <div style="flex: 1; position: relative;">
//  <fieldset id="outputPanel" style="position: absolute; height: auto; bottom: 0; top: 0; margin-top: 0.5em;display: flex; flex-grow: 1; flex-direction: column;">
// </fieldset>
//  </div>
//  </div>
// <br>
//  <p>A tool for executing JavaScript (JS) code in the browser.<br>
//  Enter any JS code on the left panel, click "update and store" to execute.
// <p> To edit this text or alter the entire page layout - select "mainHtml" in the block selector.<br>
// To edit the style - select "style" in the block selector.<br>
// To edit the initialization code - select "initializationCode" in the block selector.<br>
// To edit the entire script - select the "Whole script" radio button. You can then add new blocks, modify block names, etc. by adding and editing comments of the form <pre>//+ &lt;yourBlockName&gt; {"type": &lt;"html"|"css"|"javascript"&gt;, "target": &lt;yourTargetHtmlId&gt; [, "direction": "rtl"]}</pre> to the code.
// </p>

