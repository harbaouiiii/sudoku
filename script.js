document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("sudoku-grid");

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("min", "1");
      input.setAttribute("max", "9");
      input.setAttribute("id", `cell-${row}-${col}`);
      grid.appendChild(input);
    }
  }

  const solveBtn = document.getElementById("solve-btn");

  solveBtn.addEventListener("click", function () {
    const board = getBoardFromInputs();
    if (solveSudoku(board)) {
      fillSolvedBoard(board);
    } else {
      alert("No solution exists.");
    }
  });

  function getBoardFromInputs() {
    const board = [];
    for (let row = 0; row < 9; row++) {
      const rowValues = [];
      for (let col = 0; col < 9; col++) {
        const cellValue = document.getElementById(`cell-${row}-${col}`).value;
        rowValues.push(cellValue ? parseInt(cellValue) : 0);
      }
      board.push(rowValues);
    }
    return board;
  }

  function fillSolvedBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        if (!cell.value) {
          cell.value = board[row][col];
          cell.classList.add("missing");
        } else {
          cell.classList.add("filled");
        }
      }
    }
  }

  function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  }

  function solveSudoku(board) {
    const empty = findEmpty(board);
    if (!empty) return true;

    const [row, col] = empty;

    for (let num = 1; num <= 9; num++) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (solveSudoku(board)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  function findEmpty(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  const solveButton = document.getElementById("solve-btn");
  const inputs = document.querySelectorAll(".sudoku-grid input");

  let isSolved = false;

  solveButton.addEventListener("click", function () {
    if (!isSolved) {
      inputs.forEach((input) => {
        input.disabled = true;
      });

      solveButton.textContent = "Solve Another Puzzle";
      isSolved = true;
    } else {
      inputs.forEach((input) => {
        input.value = "";
        input.disabled = false;
      });

      solveButton.textContent = "Solve";
      isSolved = false;
    }
  });
});
