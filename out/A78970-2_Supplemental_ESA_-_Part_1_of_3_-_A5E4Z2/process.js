const interval = setInterval(() => {
  p1 = document.querySelector("#p1");
  if (p1) {
    main(p1);
    clearInterval(interval);
  }
}, 500);

const main = p1 => {
  const page1 = document.querySelector("#page1");
  p1.style.opacity = "0.8";

  new ResizeObserver(() => {
    console.log("PAGE SIZE:", page1.offsetWidth, page1.offsetHeight);
    canvasElement.setAttribute("width", parseInt(page1.style.width));
    canvasElement.setAttribute("height", parseInt(page1.style.height));
    console.log("CANVAS SIZE:", canvasElement.width, canvasElement.height);
  }).observe(page1);

  const canvasElement = document.createElement("canvas");

  page1.appendChild(canvasElement);

  const ctx = canvasElement.getContext("2d");

  let last_mousex = 0;
  let last_mousey = 0;
  let mousex = 0;
  let mousey = 0;
  let mousedown = false;

  page1.addEventListener("mousedown", e => {
    const rect = e.target.getBoundingClientRect();
    last_mousex = e.clientX - rect.left; //x position within the element.
    last_mousey = e.clientY - rect.top; //y position within the element.
    mousedown = true;
  });

  page1.addEventListener("mouseup", e => {
    mousedown = false;
  });

  page1.addEventListener("mousemove", e => {
    const rect = page1.getBoundingClientRect();
    mousex = parseInt(e.clientX - rect.left); //x position within the element.
    mousey = parseInt(e.clientY - rect.top); //y position within the element.
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
  });
};
