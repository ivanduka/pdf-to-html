const interval = setInterval(() => {
  p1 = document.querySelector("#p1");
  if (p1) {
    main(p1);
    clearInterval(interval);
  }
}, 500);

const main = p1 => {
  const page1 = document.querySelector("#page1");
  const canvasElement = document.createElement("canvas");
  page1.appendChild(canvasElement);
  const ctx = canvasElement.getContext("2d");

  let rect = page1.getBoundingClientRect();
  let lastMouseX = 0;
  let lastMouseY = 0;
  let newMouseX = 0;
  let newMouseY = 0;
  let canvasLeftOffset = rect.left;
  let canvasTopOffset = rect.top;
  let mouseIsPressed = false;
  let width = page1.style.width;
  let height = page1.style.height;

  p1.style.opacity = 0.8;

  new ResizeObserver(() => {
    width = page1.style.width;
    height = page1.style.height;
    canvasLeftOffset = rect.left;
    canvasTopOffset = rect.top;
    rect = page1.getBoundingClientRect();
    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);
  }).observe(page1);

  page1.addEventListener("mousedown", e => {
    const rect = e.target.getBoundingClientRect();
    lastMouseX = e.clientX - rect.left; //x position within the element.
    lastMouseY = e.clientY - rect.top; //y position within the element.
    mouseIsPressed = true;
  });

  page1.addEventListener("mouseup", e => {
    mouseIsPressed = false;
    console.log("======================");
    console.log(`Page size: ${width} by ${height}`);
    console.log(
      `Rectangle: ${lastMouseX}x${lastMouseY} to ${newMouseX}x${newMouseY}`
    );
  });

  page1.addEventListener("mousemove", e => {
    newMouseX = parseInt(e.clientX - canvasLeftOffset);
    newMouseY = parseInt(e.clientY - canvasTopOffset);
    if (mouseIsPressed) {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); //clear canvas
      ctx.beginPath();
      var width = newMouseX - lastMouseX;
      var height = newMouseY - lastMouseY;
      ctx.rect(lastMouseX, lastMouseY, width, height);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });
};
