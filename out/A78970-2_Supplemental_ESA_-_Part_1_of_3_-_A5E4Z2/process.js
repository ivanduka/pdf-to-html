const obj = {};

const mouseUp = e => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  console.log(
    `${Number.parseInt(obj.x, 10)}-${Number.parseInt(
      obj.y,
      10
    )} => ${Number.parseInt(x, 10)}-${Number.parseInt(y, 10)}`
  );
};

const mouseDown = e => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  obj.x = x;
  obj.y = y;
};

// setTimeout(() => console.clear(), 5000);

const page1 = document.querySelector("#page1");

page1.addEventListener("mousedown", mouseDown);
page1.addEventListener("mouseup", mouseUp);

const canvasElement = document.createElement("canvas");

setTimeout(() => {
  console.clear();
  new ResizeObserver(() => {
    console.log("SIZE:", page1.offsetWidth, page1.offsetHeight);
    canvasElement.style.width = page1.style.width;
    canvasElement.style.height = page1.style.height;
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
  last_mousex = e.clientX - canvasx;
  last_mousey = e.clientY - canvasy;
  mousedown = true;
});

//Mouseup
page1.addEventListener("mouseup", e => {
  mousedown = false;
});

//Mousemove
page1.addEventListener("mousemove", e => {
  mousex = parseInt(e.clientX - canvasx);
  mousey = parseInt(e.clientY - canvasy);
  if (mousedown) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); //clear canvas
    ctx.beginPath();
    var width = mousex - last_mousex;
    var height = mousey - last_mousey;
    ctx.rect(last_mousex, last_mousey, width, height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  //Output
  // console.log(
  //   "current: " +
  //     mousex +
  //     ", " +
  //     mousey +
  //     "\t\t\tlast: " +
  //     last_mousex +
  //     ", " +
  //     last_mousey +
  //     "\t\t\tmousedown: " +
  //     mousedown
  // );
});
