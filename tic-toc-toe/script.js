class TicTocToe {
  #symbol = "X";
  #player1 = new Set();
  #player2 = new Set();
  #winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ];

  toggleSymbol = (cell) => {
    if (cell.textContent !== "") return;
    cell.textContent = this.#symbol;
    this.#symbol === "X"
      ? this.#player1.add(+cell.id)
      : this.#player2.add(+cell.id);
    this.#symbol = this.#symbol === "X" ? "O" : "X";
  };

  isWon = () => {
    const p1 = Array.from(this.#player1);
    const p2 = Array.from(this.#player2);
    const isPlayer1 = this.#winningConditions.some((condition) =>
      condition.every((c) => p1.includes(c))
    );
    const isPlayer2 = this.#winningConditions.some((condition) =>
      condition.every((c) => p2.includes(c))
    );

    if (isPlayer1) return "player1 won";
    if (isPlayer2) return "player2 won";
  };
}

const runGame = () => {
  const t = new TicTocToe();
  const box = document.querySelector(".container");
  box.addEventListener("click", (event) => {
    const cell = event.target;
    t.toggleSymbol(cell);
    if (t.isWon()) {
      console.log(t.isWon());
      setTimeout(() => document.location.reload(), 1000);
    }
  });
};

window.onload = runGame();
