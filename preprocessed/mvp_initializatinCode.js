//+ initializationCode
function updateTextArea(text, direction = null) {
  textarea = document.getElementById('editor');
  textarea.style.direction = 'ltr';
  if(direction && direction == 'rtl') {
    textarea.style.direction = 'rtl';
  }
  textarea.value = text;
  textarea.style.height = Math.min(textarea.scrollHeight, 20 * 16) + 'px';
}


function updateScript(text) {
  let script = document.createElement('script');
  script.id = 'compose';
  let scriptText = document.createTextNode(text);
  script.appendChild(scriptText);
  document.body.appendChild(script);
}

function editableBlockContent(type, storableContent) {
  if(type == 'javascript')
    return storableContent;
  let lines = storableContent.split('\n');
  let result = '';
  for(const line of lines) {
    if(line.match(/^\/\//)) {
      result += line.substring(2) + '\n';
    }
  }
  return result;
}

function storableBlockContent(type, editableContent) {
  if(type == 'javascript') {
    return editableContent;
  }
  let lines = editableContent.split('\n');
  let result = '';
  for(const line of lines) {
    result += '//' + line + '\n';
  }
  return result;
}

function parseHeader(line) {
  if(!line.trim().match(/^\/\/\+[ ]*[a-zA-Z0-9_]+/))
    return null;
  let blockName = line.match(/[a-zA-Z0-9_]+/)[0];
  let blockAttributes = JSON.parse((line.match(/\{.*\}/) || ['{"type": "javascript"}'])[0]);
  return { "name": blockName, "attributes": blockAttributes };
}

function trimScript(text) {
  text = text.split('\/\/--BEGIN');
  text = text[text.length - 1].split('\/\/--END')[0];
  return text.trim();
}

function parseBlocks(text) {
  var blocks = {};
  var lines = trimScript(text).split('\n');
  var blockName = '';
  for(const line of lines) {
    header = parseHeader(line);
    if(header) {
      blocks[header.name] = { "attributes": header.attributes, "content": ''};
      blockName = header.name;
      continue;
    }
    blocks[blockName].content += line + '\n';
  }
  return blocks;
}

function stringifyBlocks(blocks) {
  var text = '';
  for(const blockName of Object.keys(blocks)) {
    text += '//+ ' + blockName + JSON.stringify(blocks[blockName].attributes) + '\n';
    text += blocks[blockName].content;
  }
  return text;
}

function store() {
  let label = document.getElementById('label').value;
  let timestamp = (new Date()).toISOString().substring(0, 19);
  let content = stringifyBlocks(blocks);
  for (let i = 0; i < localStorage.length; i++){
    if(localStorage.getItem(localStorage.key(i)) == content && localStorage.key(i).startsWith(label)) {
      return;
    }
  }
  localStorage.setItem(label + ' ' + timestamp, content);
}

function storeBlock() {
  let blockName = document.getElementById('blockNames').value;
  let blockContent = document.getElementById('editor').value;
  blocks[blockName].content = storableBlockContent(blocks[blockName].attributes.type, blockContent);
  store();
}

function storeWholeScript() {
  let updated_script = document.getElementById('editor').value;
  blocks = parseBlocks(updated_script);
  store();
}

function execute() {
  Array.from(document.head.getElementsByTagName('style')).forEach(element => element.remove());
  currentScript = document.getElementById('compose').innerHTML;
  newScript = stringifyBlocks(blocks);
  document.body.innerHTML = '<div id="default"></div>';
  try{
    new Function(newScript); // check if the script is valid
    updateScript(`
      try { initialized = false;
      \/\/--BEGIN
      ${newScript}
      \/\/--END
       } catch(e) {
         alert('Error while executing updated script\\n'+ e);
         if(! initialized) {
           document.getElementById('compose').remove();
           let script = document.createElement('script');
           script.id = 'compose';
           let scriptText = document.createTextNode(currentScript);
           script.appendChild(scriptText);
           document.body.appendChild(script);
         }
       }
    `);
  } catch(e) {
    alert('Updated script is not valid\n'+ e);
    updateScript(trimScript(currentScript));
  }
}

onSelectWholeScript = function() {
  document.getElementById('checkpoints').style.display = 'none';
  document.getElementById('blockNames').style.display = 'none';
  updateTextArea(stringifyBlocks(blocks));
  document.getElementById('store').onclick = function() {
    storeWholeScript();
  }
  document.getElementById('execute').onclick = function() {
    storeWholeScript();
    execute();
  }
}

onSelectBlock = function() {
  document.getElementById('checkpoints').style.display = 'none';
  let blockNames = Object.keys(blocks);
  let select = document.getElementById('blockNames');
  select.options.length = 0;
  select.style.display = 'block';
  for(const blockName of Object.keys(blocks)) {
    let option = document.createElement('option');
    option.value = blockName;
    option.innerHTML = blockName;
    select.appendChild(option);
  }
  select.onchange = function() {
    let blockName = select.value;
    updateTextArea(editableBlockContent(blocks[blockName].attributes.type, blocks[blockName].content), blocks[blockName].attributes.direction);
  }
  document.getElementById('store').onclick = function() {
    storeBlock();
  }
  document.getElementById('execute').onclick = function() {
    storeBlock();
    execute();
  }
  updateTextArea(editableBlockContent(blocks[blockNames[0]].attributes.type, blocks[blockNames[0]].content));
}

onRestore = function() {
  document.getElementById('blockNames').style.display = 'none';
  let select = document.getElementById('checkpoints');
  select.options.length = 0;
  select.style.display = 'block';
  for(let key of Object.keys(localStorage)) {
    let option = document.createElement('option');
    option.value = key;
    option.innerHTML = key;
    select.appendChild(option);
  }
  select.onchange = function() {
    let label = select.value;
    let content = localStorage.getItem(label);
    blocks = parseBlocks(content);
    updateTextArea(stringifyBlocks(blocks));
  }
  document.getElementById('store').onclick = function() {
    storeWholeScript();
  }
  document.getElementById('execute').onclick = function() {
    storeWholeScript();
    execute();
  }
  updateTextArea(stringifyBlocks(blocks));
}

var blocks = parseBlocks(document.getElementById('compose').innerHTML);

for(let [blockName, block] of Object.entries(blocks)) {
  switch(block.attributes.type) {
    case 'html':
      let target = document.getElementById(block.attributes.target);
      if (block.attributes.direction == 'rtl') {
        target.style.direction = 'rtl';
      }
      target.innerHTML = editableBlockContent(block.attributes.type, block.content);
      break;
    case 'css':
      let style = document.createElement('style');
      style.innerHTML = editableBlockContent(block.attributes.type, block.content);
      document.head.appendChild(style);
      break;
  }
}

if(document.getElementById('block').checked) {
  onSelectBlock();
}

document.getElementById('whole script').onclick = onSelectWholeScript;
document.getElementById('block').onclick = onSelectBlock;
document.getElementById('restore').onclick = onRestore;
document.getElementById('clearAll').onclick = () => { localStorage.clear(); };
document.getElementById('clearLabel').onclick = () => {
  let label = document.getElementById('label').value;
  for (key of Object.keys(localStorage)) {
    if(key.startsWith(label+" ")) {
      localStorage.removeItem(key);
    }
  }
};

initialized = true;

