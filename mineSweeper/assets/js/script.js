const placeMines = (cells, mineCount) => {
  let mineIndexes = new Set();
  while (mineIndexes.size < mineCount) {
    const index = Math.floor(Math.random() * cells.length);
    if (index === 0 || index === cells.length - 1) {
      continue;
    }
    mineIndexes.add(index);
  }
  mineIndexes.forEach((index) => cells[index].classList.add("mine"));
  return mineIndexes;
};

const highlightCell = (cell, mineIndexes, indexRef) => {
  cell.classList.add("highlight");
  cell.setAttribute("tabindex", 0);
  cell.focus();

  if (mineIndexes.has(indexRef.current)) {
    cell.classList.add("mine-animation");

    setTimeout(() => {
      alert(" Game Over! You hit a mine!");
      window.location.reload();
    }, 500);
  }
};

const removeHighlight = (cell) => {
  cell.classList.remove("highlight");
  cell.setAttribute("tabindex", -1);
};

const movePosition = (indexRef, event, cells, mineIndexes) => {
  let totalCells = cells.length;
  let rows = Math.ceil(totalCells / indexRef.cols);
  let currentRow = Math.floor(indexRef.current / indexRef.cols);
  let currentCol = indexRef.current % indexRef.cols;

  if (event.key === "ArrowRight" && currentCol < indexRef.cols - 1) {
    indexRef.current++;
  }
  if (event.key === "ArrowLeft" && currentCol > 0) {
    indexRef.current--;
  }
  if (event.key === "ArrowDown" && currentRow < rows - 1) {
    indexRef.current += indexRef.cols;
  }
  if (event.key === "ArrowUp" && currentRow > 0) {
    indexRef.current -= indexRef.cols;
  }

  cells.forEach(removeHighlight);
  highlightCell(cells[indexRef.current], mineIndexes, indexRef);

  if (indexRef.current === cells.length - 1) {
    alert("Congratulation ... you won!!");
    window.location.reload();
  }
};

const handleKeyPress = (event, cells, indexRef, mineIndexes) => {
  if (
    !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
  ) {
    return;
  }
  movePosition(indexRef, event, cells, mineIndexes);
};

const runGame = () => {
  const grid = document.querySelector(".parent");
  grid.setAttribute("tabindex", "0");
  grid.focus();

  const cells = Array.from(grid.children);
  const styles = window.getComputedStyle(grid);
  const cols = styles
    .getPropertyValue("grid-template-columns")
    .split(" ").length;

  const indexRef = { current: 0, cols: cols };

  const mineIndexes = placeMines(cells, 3);
  highlightCell(cells[indexRef.current], mineIndexes, indexRef);

  console.log(mineIndexes);
  grid.addEventListener("keydown", (event) => {
    handleKeyPress(event, cells, indexRef, mineIndexes);
  });
};

window.onload = runGame;
