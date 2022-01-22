let writing = false;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'red';
ctx.lineWidth = 1;
ctx.lineCap = "round";

const strokeThickness = document.getElementById("stroke-thickness");
const strokeColor = document.getElementById("stroke-color");
const closeIcon = document.getElementsByClassName("clear-icon")[0];

const initialize = () => {
  ctx.lineWidth = parseInt(strokeThickness.value);
  ctx.strokeStyle = strokeColor.value;
};

initialize();

closeIcon.addEventListener("click", e => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

strokeThickness.addEventListener("change", e => {
  ctx.closePath();
  ctx.lineWidth = parseInt(e.target.value);
});

strokeColor.addEventListener("change", e => {
  ctx.strokeStyle = e.target.value;
});

const updateCanvasDimention = () => {
  const container = document.getElementById("main");
  canvas.setAttribute("height", container.offsetHeight);
  canvas.setAttribute("width", container.offsetWidth);
};
updateCanvasDimention();

canvas.addEventListener("mousedown", (e) => {
  writing = true;
  ctx.beginPath();
  initialize();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});
canvas.addEventListener("mouseup", () => {
  writing = false;
});
canvas.addEventListener("mouseleave", () => {
  writing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (writing) {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
  }
});

const t = (s) => {
  if (s.length > 2) {
    return s.substr(s.length - 2)
  }
  return s;
}

const getFormattedDateAndTime = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = t("0" + (d.getMonth() + 1));
  const day = t("0" + d.getDate());

  const hr = t("0" + d.getHours());
  const min = t("0" + d.getMinutes());
  const sec = t("0" + d.getSeconds());

  return `${year}-${month}-${day} ${hr}:${min}:${sec}`
};

const dt = document.getElementById("dt");
dt.innerText = getFormattedDateAndTime();
setInterval(() => {
  dt.innerText = getFormattedDateAndTime();
}, 1000);