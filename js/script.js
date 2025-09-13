const container = document.querySelector("#container");

const squaresPerSide = 16;
for (let i = 0; i < squaresPerSide ** 2; i++)
{
  let newPanel = document.createElement("div");
  newPanel.setAttribute
  (
    "style", 
    `width: ${container.offsetWidth / squaresPerSide}px; `
    + `height: ${container.offsetHeight / squaresPerSide}px;`
  );
  newPanel.classList.add("panel");
  container.appendChild(newPanel);
}
