const totalPagesInPDF = IDRViewer.config.pagecount;

for (let i = 1; i <= totalPagesInPDF; i++) {
  const pageX = document.querySelector("#page" + i);

  const observer = new MutationObserver((mutationList, observerObject) => {
    mutationList.forEach(mutation => {
      if (
        mutation.type === "childList" &&
        Array.from(mutation.addedNodes).filter(node => node.id === "p1")
          .length === 1
      ) {
        observerObject.disconnect();
        const pX = document.querySelector("#p" + i);
        main(pX, pageX);
      }
    });
  });

  observer.observe(pageX, { childList: true });
}

const main = (pX, pageX) => {
  const canvasElement = document.createElement("canvas");
  pageX.appendChild(canvasElement);
  const ctx = canvasElement.getContext("2d");

  let rect = pageX.getBoundingClientRect();
  let lastMouseX = 0;
  let lastMouseY = 0;
  let newMouseX = 0;
  let newMouseY = 0;
  let canvasLeftOffset = rect.left;
  let canvasTopOffset = rect.top;
  let mouseIsPressed = false;
  let pageWidth = parseInt(pageX.style.width);
  let pageHeight = parseInt(pageX.style.height);

  pX.style.opacity = 0.8;
  pX.style.cursor = "crosshair";

  new ResizeObserver(() => {
    pageWidth = parseInt(pageX.style.width);
    pageHeight = parseInt(pageX.style.height);
    rect = pageX.getBoundingClientRect();
    canvasLeftOffset = rect.left;
    canvasTopOffset = rect.top;
    canvasElement.setAttribute("width", pageWidth);
    canvasElement.setAttribute("height", pageHeight);
  }).observe(pageX);

  pageX.addEventListener("mousedown", e => {
    const rect = e.target.getBoundingClientRect();
    lastMouseX = e.clientX - rect.left; //x position within the element.
    lastMouseY = e.clientY - rect.top; //y position within the element.
    mouseIsPressed = true;
  });

  pageX.addEventListener("mouseup", e => {
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

  pageX.addEventListener("mousemove", e => {
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
