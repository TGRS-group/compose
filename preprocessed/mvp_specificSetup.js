//+ specificSetup
function setOutput(text) {
  document.getElementById("output").innerHTML=text;
}

function print(text) {
  document.getElementById("output").innerHTML += text;
}

if("computeCode" in blocks) {
  document.getElementById("blockNames").value = "computeCode";
  document.getElementById("blockNames").onchange();
}

//+ computeCode
// enter code here
// call setOutput(text) to print output on the output panel
