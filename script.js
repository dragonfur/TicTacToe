// script

const gameSquares = []

const gameBoard = (() => {

    const createBoard = () => {
        const board = document.getElementById("board")
        for (i = 0; i < 9; i++) {
            var cell = document.createElement("div")
            cell.classList.add("cell")
            cell.setAttribute("data-cell", i+1)
            board.appendChild(cell)
            cell.addEventListener("click", () => {
                console.log("I work!")
            })
        }
    }

    return {
        createBoard
    }
})()

gameBoard.createBoard()