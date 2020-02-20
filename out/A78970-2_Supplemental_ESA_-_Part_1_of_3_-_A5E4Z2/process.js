const obj = {};

const mouseup = e => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  console.log(`${obj.x}-${obj.y} => ${x}-${y}`);
};

const mousedown = e => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  obj.x = x;
  obj.y = y;
};

const a = document.querySelector("#page1");
console.log(a.offsetWidth, a.offsetHeight);
a.addEventListener("mousedown", mousedown);
a.addEventListener("mouseup", mouseup);
