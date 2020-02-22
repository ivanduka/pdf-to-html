const observer = new MutationObserver(mutationList => {
  mutationList.forEach(mutation => {
    if (
      mutation.type === "childList" &&
      Array.from(mutation.addedNodes).filter(node => node.id === "p1")
        .length === 1
    ) {
      observer.disconnect();
      const p1 = document.querySelector("#p1");
      main(p1);
    }
  });
});

const config = {
  attributes: false,
  characterData: false,
  childList: true,
  subtree: false
};

const page1 = document.querySelector("#page1");

observer.observe(page1, config);

// const pages = IDRViewer.config.pagecount;

const main = p1 => {
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
  let pageWidth = parseInt(page1.style.width);
  let pageHeight = parseInt(page1.style.height);

  p1.style.opacity = 0.8;
  p1.style.cursor = "crosshair";

  new ResizeObserver(() => {
    pageWidth = parseInt(page1.style.width);
    pageHeight = parseInt(page1.style.height);
    rect = page1.getBoundingClientRect();
    canvasLeftOffset = rect.left;
    canvasTopOffset = rect.top;
    canvasElement.setAttribute("width", pageWidth);
    canvasElement.setAttribute("height", pageHeight);
  }).observe(page1);

  page1.addEventListener("mousedown", e => {
    const rect = e.target.getBoundingClientRect();
    lastMouseX = e.clientX - rect.left; //x position within the element.
    lastMouseY = e.clientY - rect.top; //y position within the element.
    mouseIsPressed = true;
  });

  page1.addEventListener("mouseup", e => {
    mouseIsPressed = false;
    x1 = parseInt((lastMouseX / pageWidth) * 100);
    y1 = parseInt((lastMouseY / pageHeight) * 100);
    x2 = parseInt((newMouseX / pageWidth) * 100);
    y2 = parseInt((newMouseY / pageHeight) * 100);

    console.log("======================");
    console.log(`Page size: ${pageWidth} by ${pageHeight}`);
    console.log(
      `Rectangle: ${lastMouseX}x${lastMouseY} to ${newMouseX}x${newMouseY}`
    );
    console.log(`In percentage: ${x1}%-${x2}% x ${y1}%-${y2}%`);
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
