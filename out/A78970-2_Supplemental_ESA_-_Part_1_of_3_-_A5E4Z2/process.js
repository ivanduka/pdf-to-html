// const obj = {};

// const mouseUp = e => {
//   const rect = e.target.getBoundingClientRect();
//   const x = e.clientX - rect.left; //x position within the element.
//   const y = e.clientY - rect.top; //y position within the element.
//   console.log(
//     `${Number.parseInt(obj.x, 10)}-${Number.parseInt(
//       obj.y,
//       10
//     )} => ${Number.parseInt(x, 10)}-${Number.parseInt(y, 10)}`
//   );
// };

// const mouseDown = e => {
//   const rect = e.target.getBoundingClientRect();
//   const x = e.clientX - rect.left; //x position within the element.
//   const y = e.clientY - rect.top; //y position within the element.
//   obj.x = x;
//   obj.y = y;
// };

const page1 = document.querySelector("#page1");
let p1;

// page1.addEventListener("mousedown", mouseDown);
// page1.addEventListener("mouseup", mouseUp);

const canvasElement = document.createElement("canvas");

setTimeout(() => {
  // console.clear();
  p1 = document.querySelector("#p1");
  p1.style.opacity = "0.8";

  new ResizeObserver(() => {
    console.log("SIZE:", page1.offsetWidth, page1.offsetHeight);
    canvasElement.setAttribute("width", parseInt(page1.style.width));
    canvasElement.setAttribute("height", parseInt(page1.style.height));
    console.log(canvasElement.width, canvasElement.height);
  }).observe(page1);
}, 5000);

page1.appendChild(canvasElement);

const ctx = canvasElement.getContext("2d");

const rect = canvasElement.getBoundingClientRect();
const canvasx = document.body.scrollLeft + rect.left;
const canvasy = document.body.scrollTop + rect.top;

let last_mousex = 0;
let last_mousey = 0;
let mousex = 0;
let mousey = 0;
let mousedown = false;

//Mousedown
page1.addEventListener("mousedown", e => {
  const rect = e.target.getBoundingClientRect();
  last_mousex = e.clientX - rect.left; //x position within the element.
  last_mousey = e.clientY - rect.top; //y position within the element.
  mousedown = true;
});

//Mouseup
page1.addEventListener("mouseup", e => {
  mousedown = false;
});

//Mousemove - CANVAS IS 0,0 bottom left
page1.addEventListener("mousemove", e => {
  const rect = page1.getBoundingClientRect();
  const mousex = parseInt(e.clientX - rect.left); //x position within the element.
  const mousey = parseInt(e.clientY - rect.top); //y position within the element.
  console.log(canvasElement.width, canvasElement.height);
  if (mousedown) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); //clear canvas
    ctx.beginPath();
    var width = mousex - last_mousex;
    var height = mousey - last_mousey;
    ctx.rect(last_mousex, last_mousey, width, height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  console.log(
    "current: " +
      mousex +
      ", " +
      mousey +
      "\t\t\tlast: " +
      last_mousex +
      ", " +
      last_mousey +
      "\t\t\tmousedown: " +
      mousedown
  );
});
