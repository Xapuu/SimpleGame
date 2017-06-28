function gameOn () {
  let gameBoard = []
  let playerTurn = 'first'
  let board = document.getElementById('game-board')
  let boardSize = 10
  let currentPlayer = document.getElementById('player-on-turn')

  gameLoop()

  function gameLoop () {
    // refresh the board
    gameBoard = []
    board.innerHTML = ''
    
    // filling the board
    for (let row = 0; row < boardSize; row++) {
      gameBoard[row] = []
      let line = document.createElement('TR')
      line.setAttribute('class', 'collum')
      for (let coll = 9; coll >= 0; coll--) {
        let node = document.createElement('DIV')
        node.setAttribute('class', 'token')
        node.setAttribute('id', `${row}on${coll}`)

        // game logick
        node.addEventListener('click', function (e) {
          if (e.target.className == 'token') {
            hit(row, coll)
            winner(row, coll)
            switchPlayers()
          }
        })

        line.appendChild(node)
      }
      board.appendChild(line)
    }
  }

  function winner (row, coll) {
    // this sets the count of the tokens needed to win
    let winningCondition = 3
    let winner = false

    // make the game logick here

    // look down
    lookDown()
    // look sideways
    lookSideways()
    // look up diagonals
    diagonalBotLeftTopRight()

    diagonalBotRightTopLeft()

    

    if (winner) {
      let result = document.createElement('DIV')
      result.innerHTML = playerTurn
      result.className = 'win-log'
      document.body.appendChild(result)

      gameLoop()
      // Must create a game over event
    }

    // Fully completed funcs
    function lookDown () {
      let currentCellHeight = gameBoard[row].length
      let winningConditionCounter = 0
      if (gameBoard[row].length >= winningCondition) {
        while (gameBoard[row][currentCellHeight - 1] == playerTurn) {
          currentCellHeight--
          winningConditionCounter++
          if (winningCondition == winningConditionCounter) {
            winner = true
            break
          }
        }
      }
    }

    function lookSideways () {
      let currentCellHeight = gameBoard[row].length - 1
      let winningConditionCounter = 0
      let moveLeft = row
      let moveRight = row + 1

      while (
        moveLeft >= 0 &&
        gameBoard[moveLeft][currentCellHeight] == playerTurn
      ) {
        moveLeft--
        winningConditionCounter++

        if (winningCondition == winningConditionCounter) {
          winner = true
          break
        }
      }

      while (
        moveRight < boardSize &&
        gameBoard[moveRight][currentCellHeight] == playerTurn
      ) {
        moveRight++
        winningConditionCounter++

        if (winningCondition == winningConditionCounter) {
          winner = true
          break
        }
      }
    }

    function diagonalBotRightTopLeft () {
      let winningConditionCounter = 0
      let currentCellHeightGoingBotRightTopLeft = gameBoard[row].length - 1
      let currentCellHeightGoingTopLeftBotRight = gameBoard[row].length - 2

      let moveLeft = row
      let moveRight = row + 1
      while (
        moveLeft >= 0 &&
        currentCellHeightGoingBotRightTopLeft >= 0 &&
        gameBoard[moveLeft][currentCellHeightGoingBotRightTopLeft] == playerTurn
      ) {
        moveLeft--
        currentCellHeightGoingBotRightTopLeft++
        winningConditionCounter++
        if (winningCondition == winningConditionCounter) {
          winner = true
          break
        }
      }
      while (
        moveRight < boardSize &&
        currentCellHeightGoingTopLeftBotRight >= 0 &&
        gameBoard[moveRight][currentCellHeightGoingTopLeftBotRight] ==
          playerTurn
      ) {
        moveRight++
        currentCellHeightGoingTopLeftBotRight--
        winningConditionCounter++
        if (winningCondition == winningConditionCounter) {
          winner = true
          break
        }
      }
    }

    function diagonalBotLeftTopRight () {
      let winningConditionCounter = 0

      let currentCellHeightGoingBotLeft = gameBoard[row].length - 1
      let currentCellHeightGoingTopRight = gameBoard[row].length 

      let moveLeft = row
      let moveRight = row + 1

      while (
        moveLeft >= 0 &&
        currentCellHeightGoingBotLeft >= 0 &&
        gameBoard[moveLeft][currentCellHeightGoingBotLeft] == playerTurn
      ) {
        moveLeft--
        currentCellHeightGoingBotLeft--
        winningConditionCounter++

        if (winningCondition == winningConditionCounter) {
          winner = true
          break
        }
      }

      while (
        moveRight < boardSize &&
        gameBoard[moveRight][currentCellHeightGoingTopRight] == playerTurn
      ) {
        moveRight++
        currentCellHeightGoingTopRight++
        winningConditionCounter++

        if (winningCondition == winningConditionCounter) {
          winner = true
          break
        }
      }
    }
  }

  function hit (row, coll) {
    let emptySpot = gameBoard[row].length
    gameBoard[row][emptySpot] = playerTurn

    if (playerTurn == 'first') {
      console.log(document.getElementById(row + 'on' + emptySpot))
      document.getElementById(row + 'on' + emptySpot).className += ' player1'
    } else {
      console.log(document.getElementById(row + 'on' + emptySpot))
      document.getElementById(row + 'on' + emptySpot).className += ' player2'
    }
  }

  function switchPlayers () {
    if (playerTurn == 'first') {
      playerTurn = 'second'
      currentPlayer.innerHTML='second'
    } else {
      playerTurn = 'first'
           currentPlayer.innerHTML='first'
    }
  }
}
