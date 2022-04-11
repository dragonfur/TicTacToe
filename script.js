// script



const gameBoard = (() => {

    const gameSquares = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]

    const createBoard = () => {
        const board = document.getElementById("board")
        gameSquares.forEach((element) => {
            var cell = document.createElement("div")
            cell.classList.add("cell")
            cell.setAttribute("data-cell", element)
            board.appendChild(cell)
            cell.addEventListener("click", displayController.getClick, {once : true})
        })
    }

    return {
        createBoard,
        gameSquares
    }
})()

const displayController = (() => {

    let circleTurn
    const CIRCLE_CLASS = "o"
    const X_CLASS = "x"

    const getClick = function handleClick(e) {
        const cellTarget = e.target
        const cellNumber = e.target.dataset.cell
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        placemark(cellTarget, currentClass, cellNumber)
        circleTurn = !circleTurn
    }

    function placemark(cell, currentClass, index) {
        cell.classList.add(currentClass)
        gameBoard.gameSquares[index] = currentClass
        console.log(gameBoard.gameSquares)
    }

    return {
        getClick
    }
})()

gameBoard.createBoard()