const container = document.querySelector("#container");

const squaresPerSide = 16;
for (let i = 0; i < squaresPerSide ** 2; i++)
{
  let newPanel = document.createElement("div");
  newPanel.setAttribute
  (
    "style", 
    `width: ${container.clientWidth / squaresPerSide}px; `
    + `height: ${container.clientHeight / squaresPerSide}px;`
    + `background-color: ${chooseColor()};`
  );
  newPanel.classList.add("panel");
  newPanel.addEventListener("mouseover", darken);
  container.appendChild(newPanel);
}

function chooseColor() {
  maxValue = 256;
  color = {};
  for (let val of ["r", "g", "b"]) {
    color[val] = Math.floor(Math.random() * maxValue);
  }
  return `rgba(${color.r}, ${color.g}, ${color.b}, 0.0)`
}

function darken(event) {
  const panel = event.target;

  const oldRgba = (
    window
    .getComputedStyle(panel)
    .getPropertyValue("background-color")
  );
  const oldAlpha = parseFloat(oldRgba.slice(5,-1).split(", ")[3]);

  const steps = 10;
  const newAlpha = Math.min(oldAlpha + 1 / steps, 1.0);
  const newRgba = oldRgba.replace(/[^,)\s]+(?=\s*\))/, newAlpha);
  panel.style.backgroundColor = newRgba;
  return
}
