function gameOn () {
  let gameBoard = []

  let playerTurn = 'first'

  let board = document.getElementById('game-board')

  for (let row = 0; row < 10; row++) {
    gameBoard[row] = []
    let line = document.createElement('TR')
    line.setAttribute('class', 'collum')
    for (let coll = 9; coll >= 0; coll--) {
      let node = document.createElement('DIV')
      node.setAttribute('class', 'token')
      node.setAttribute('id', `${row}on${coll}`)

      // add event listeners and game logick
      node.addEventListener('click', function (e) {
        if (e.target.className == 'token') {
          hit(row, coll, playerTurn)
          winner(row, coll)
        }
      })

      line.appendChild(node)
    }
    board.appendChild(line)
  }

  function winner (row, coll) {
    let counter = 0

    // make the game logick here
    console.log(gameBoard)
  }

  function hit (row, coll) {
    let emptySpot = gameBoard[row].length
    gameBoard[row][emptySpot] = playerTurn

    if (playerTurn == 'first') {
      console.log(document.getElementById(row + 'on' + emptySpot))
      document.getElementById(row + 'on' + emptySpot).className += ' player1'
      playerTurn = 'second'
    } else {
      console.log(document.getElementById(row + 'on' + emptySpot))
      document.getElementById(row + 'on' + emptySpot).className += ' player2'
      playerTurn = 'first'
    }
  }
}
