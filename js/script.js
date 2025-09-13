const container = document.querySelector("#container");

const button = document.querySelector("button");
button.addEventListener("click", resetGrid);

function getNumPanels(numOldPanels) {
  const defaultPanels = 16;
  let panelsPerSide = parseInt(
    prompt("How many panels per side?", defaultPanels)
  );

  if (isNaN(panelsPerSide)) {
    return numOldPanels;
  }

  const maxPanels = 50;
  return Math.min(panelsPerSide, maxPanels);
}

function deletePanels(oldPanels) {
  for (let panel of oldPanels) {
    panel.remove();
  }
}

function createPanels(container, panelsPerSide) {
  for (let i = 0; i < panelsPerSide ** 2; i++) {
    let newPanel = document.createElement("div");
    newPanel.setAttribute(
      "style",
      `width: ${container.clientWidth / panelsPerSide}px; `
      + `height: ${container.clientHeight / panelsPerSide}px;`
      + `background-color: ${chooseColor()};`
    );
    newPanel.classList.add("panel");
    newPanel.addEventListener("mouseover", darken);
    container.appendChild(newPanel);
  }
}

function resetGrid() {
  const oldPanels = container.querySelectorAll(":scope > div");
  const numOldPanels = oldPanels.length;

  const panelsPerSide = getNumPanels(numOldPanels);

  if (panelsPerSide === numOldPanels) {
    return;
  }

  deletePanels(oldPanels);
  createPanels(container, panelsPerSide);
  return;
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
    .backgroundColor
  );
  const oldAlpha = parseFloat(oldRgba.slice(5,-1).split(", ")[3]);

  const steps = 10;
  const newAlpha = Math.min(oldAlpha + 1 / steps, 1.0);
  const newRgba = oldRgba.replace(/[^,)\s]+(?=\s*\))/, newAlpha);
  panel.style.backgroundColor = newRgba;
  return
}
