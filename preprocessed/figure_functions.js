//+ figureFunctions
function Rect(x,y,width,height,strokeWidth) {
  rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
  rect.setAttribute("x",x);
  rect.setAttribute("y",y);
  rect.setAttribute("width",width);
  rect.setAttribute("height",height);
  rect.setAttribute("fill","none");
  rect.setAttribute("stroke","black");
  rect.setAttribute("stroke-width",strokeWidth || "1");
  document.getElementById("svgOutput").appendChild(rect);
  return rect;
}

function Circle(cx,cy,r) {
  circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  circle.setAttribute("cx",cx);
  circle.setAttribute("cy",cy);
  circle.setAttribute("r",r);
  circle.setAttribute("fill","none");
  circle.setAttribute("stroke","black");
  document.getElementById("svgOutput").appendChild(circle);
  return circle;
}

function Line(x1,y1,x2,y2) {
  line = document.createElementNS("http://www.w3.org/2000/svg","line");
  line.setAttribute("x1",x1);
  line.setAttribute("y1",y1);
  line.setAttribute("x2",x2);
  line.setAttribute("y2",y2);
  line.setAttribute("stroke","black");
  document.getElementById("svgOutput").appendChild(line);
  return line;
}

function xlim(xmin,width) {
  ymin = document.getElementById("svgOutput").getAttribute("viewBox").split(" ")[1];
  height = document.getElementById("svgOutput").getAttribute("viewBox").split(" ")[3];
  document.getElementById("svgOutput").setAttribute("viewBox",xmin+" "+ymin+" "+width+" "+height);
}

function ylim(ymin,height) {
  xmin = document.getElementById("svgOutput").getAttribute("viewBox").split(" ")[0];
  width = document.getElementById("svgOutput").getAttribute("viewBox").split(" ")[2];
  document.getElementById("svgOutput").setAttribute("viewBox",xmin+" "+ymin+" "+width+" "+height);
}
