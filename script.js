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
        displayController.whatsTheStatus.innerHTML = `${displayController.playerOneName.childNodes[0].textContent} starts first.`
    }

    const restartGameButton = () => {
        const restartButton = document.querySelector("button.restartGame")
        restartButton.addEventListener("click", () => {
            if(confirm("Are you sure?")) {
                createBoard()
            }
            else {
                return
            }
        })
    }

    return {
        createBoard,
        gameSquares,
        restartGameButton
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
    var activeClass
    const whatsTheStatus = document.querySelector(".statusDisplay")
    const playerOneName = document.querySelector(".playerOneName")
    const playerTwoName = document.querySelector(".playerTwoName")

    const getClick = function handleClick(e) {
        const cellTarget = e.target
        const cellNumber = e.target.dataset.cell
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        const currentPlayer = circleTurn ? playerTwoName : playerOneName
        const reversePlayerTurns = circleTurn ? playerOneName : playerTwoName
        activeClass = currentClass
        placemark(cellTarget, currentClass, cellNumber)
        circleTurn = !circleTurn
        rounds += 1
        if (checkWin(currentClass)) {
            console.log(`${currentClass} wins`)
            var boardCover = document.querySelector("div.boardCover")
            boardCover.style.display = "block"
            whatsTheStatus.textContent = `${currentPlayer.childNodes[0].textContent} is the winner!`
            circleTurn ? (playerOneScore.textContent = (parseInt(OneScore) + 1)) : (playerTwoScore.textContent = (parseInt(TwoScore) + 1))
            TwoScore = playerTwoScore.textContent
            OneScore = playerOneScore.textContent
        }
        else if (isDraw(rounds)) {
            var boardCover = document.querySelector("div.boardCover")
            boardCover.style.display = "block"
            whatsTheStatus.textContent = "It's a draw!"
        }
        else
        {whatsTheStatus.textContent = `${reversePlayerTurns.childNodes[0].textContent}'s turn.`}
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
        return (roundNumber === 9)
    }

    const restartMark = function backtoX() {
        circleTurn = false
        gameBoard.gameSquares = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
        rounds = 0
    }

    //PlayerNames
    const changeName = () => {
        playerOneName.addEventListener("click", changeNamePrompt)
        playerTwoName.addEventListener("click", changeNamePrompt)
    }

    function changeNamePrompt(e){
        e.target.childNodes[0].textContent = prompt("What would you like to change your name to?", "Boaty McBoatface")
        if (e.target.childNodes[0].textContent === "") {
            e.target.childNodes[0].textContent = "Boaty McBoatface"
        }
    }

    //score
    const playerOneScore = document.querySelector(".playerOneScore")
    const playerTwoScore = document.querySelector(".playerTwoScore")
    var OneScore = playerOneScore.textContent
    var TwoScore = playerTwoScore.textContent

    return {
        getClick,
        restartMark,
        activeClass,
        whatsTheStatus,
        changeName,
        playerOneName
    }
})()

gameBoard.createBoard()
gameBoard.restartGameButton()
displayController.changeName()