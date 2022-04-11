// script



const gameBoard = (() => {

    const board = document.getElementById("board")

    var gameSquares = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]

    const createBoard = () => {
        restartGame()
        displayController.restartMark()
        gameSquares.forEach((element) => {
            var cell = document.createElement("div")
            cell.removeEventListener("click", displayController.getClick)
            cell.classList.add("cell")
            cell.setAttribute("data-cell", element)
            cell.setAttribute("id", "cellID")
            board.appendChild(cell)
            cell.addEventListener("click", displayController.getClick, {once : true})
        })
        var boardCover = document.createElement("div")
        boardCover.classList.add("boardCover")
        board.appendChild(boardCover)
        boardCover.style.display = "none"
    }

    const restartGame = () => {    
        board.innerHTML = ""
    }

    return {
        createBoard,
        gameSquares
    }
})()

const displayController = (() => {

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    var rounds = 0
    let circleTurn
    const CIRCLE_CLASS = "o"
    const X_CLASS = "x"
    

    const getClick = function handleClick(e) {
        const cellTarget = e.target
        const cellNumber = e.target.dataset.cell
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        placemark(cellTarget, currentClass, cellNumber)
        circleTurn = !circleTurn
        rounds += 1
        if (checkWin(currentClass)) {
            console.log(`${currentClass} wins`)
            var boardCover = document.querySelector("div.boardCover")
            boardCover.style.display = "block"
        }
        isDraw(rounds)
    }

    function placemark(cell, currentClass, index) {
        cell.classList.add(currentClass)
        gameBoard.gameSquares[index] = currentClass
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return (gameBoard.gameSquares[index] === currentClass)
            })
        })
    }

    function isDraw(roundNumber) {
        if (roundNumber === 9) {
            console.log("Draw")
            var boardCover = document.querySelector("div.boardCover")
            boardCover.style.display = "block"
        }
    }

    const restartMark = function backtoX() {
        circleTurn = false
        gameBoard.gameSquares = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
        rounds = 0
    }

    return {
        getClick,
        restartMark
    }
})()

gameBoard.createBoard()