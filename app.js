/**
 * We need to use an outside library to easily
 * get input from the user. I've already put it
 * in your package.json, and startfrom installed it,
 * but to actually use it, we need to import it.
 *
 * I've given this to you below. We're importing the
 * npm package 'readline-sync' and capturing it by the
 * name readlineSync so that we can use it later.
 */

import readlineSync from 'readline-sync';

/**
 * We're going to be storing multiple Players
 * with some specific information about them. This
 * is a great time to use a constructor.
 *
 * Fill out the constructor function below. It should
 * take the player's name and their tictactoe letter
 * as parameters.
 */

export function Player(name, letter) {
  this.name = name;
  this.letter = letter;
}

/**
 * We need to be able to display the board after
 * each move. To do this, we just need to log
 * out one line for each of our nested arrays
 * we're using for our game state.
 *
 * I've provided this function below as drawBoard.
 * It takes the game state as its only parameter.
 */

function drawBoard(state) {
  console.log("    1   2   3");

  state.forEach(function(row, index) {
    console.log("  ~~~~~~~~~~~~~");
    console.log((index + 1) + " | " + row.join(" | "));
  });
}


/**
 * Before a player can make a move, we need to know
 * if there are moves available to them.
 *
 * Define the emptySpotsLeft function below. It
 * should take a single argument that is the current
 * state of the game as a nested array.
 *
 * Example array:
 * [
 *  ['X', 'X', 'O'],
 *  ['O', 'X', 'X'],
 *  ['X', 'O', 'O']
 * ]
 *
 * If any of the items in the array are a blank space,
 * there are moves left, so it should return true. If
 * all 3 arrays contain Xs or Os, it should return
 * false.
 */

 export function emptySpotsLeft(state) {
   var hasMoves = false;
   for (var row = 0; row < state.length; row++) {
       for (var column = 0; column < state.length; column++) {
           if(state[row][column] === ' '){
               hasMoves = true;
           }
       }
   }
   return hasMoves;
 }



/**
 * We need a function to validate player moves.
 *
 * The obvious thing to validate is input. If they
 * put in anything but 1, 2 or 3 for row or column,
 * we need to reject it.
 *
 * We also need to validate that the space is
 * available. We can do that by converting their
 * input into positions in our array. Since arrays
 * are zero indexed, we know that we actually need
 * state[row - 1][column - 1], so if they want
 * to put something in 1 2 we check state[0][1]
 *
 * Define a function below that can take the current
 * board state and an object representing the
 * player's move and validate it by returning
 * either true or false.
 */

 export function validateMove(state, move) {
     var isValidMove = false;
     //validate move cells exist
     if (move.row >= 1 && move.row <= 3 &&
         move.column >= 1 && move.column <= 3) {
         //check if selected coordinate is available
         if (state[move.row - 1][move.column - 1] === ' ') {
             isValidMove = true;
         }
     }
     return isValidMove;
 }

/**
 * We need a function to ask a user for their move.
 * This is more complicated than the Guess a Number
 * version because we need to know *which* player
 * we're asking, and we need to ask for multiple
 * pieces of information.
 *
 * Define the function getPlayerMove. It should
 * take the current Player as its only argument.
 * It should display the current user's name and
 * letter, then ask them to choose a row and a
 * column by entering a number from 1 to 3.
 *
 * For example, to choose the top left spot,
 * I would answer 1 to the first question and 1
 * to the second question. To choose the bottom
 * right spot, I would answer 3 to the first
 * question and 3 to the second question.
 *
 * Then, we need to call our validateMove method
 * on our move to make sure it's something we can
 * actually do.
 *
 * Then, we should return an object with the
 * keys row and column set to their answers.
 *
 * NOTE! Their answers will be strings, but
 * we want to convert them to Integer before
 * we return or validate them.
 */

  export function getPlayerMove(state, player) {
    console.log("It's " + player.name + "'s turn to place the letter " + player.letter + ".");
    var move = { row: "", column: "" };
    //run at least once to get move
    //continue running if invalid
    do {
      move.row = readlineSync.question(player.name + ", what row?");
      move.column = readlineSync.question(player.name + ", what column?")
      if (validateMove(state, move) === false) {
        console.log("Invalid move. Try again, " + player.name + "...");
      }
    }
    while (!validateMove(state,move));

    //if we reach here, move is valid
    return move;
}






/**
 * One of the hardest things we have to determine
 * is whether or not someone has won the game.
 *
 * Tic-Tac-Toe has 8 possible win conditions:
 * 3 horizontal win conditions, 3 vertical win
 * conditions and 2 diagonal win conditions.
 *
 * While there may be a smart way to solve them,
 * we're just going to brute force it. Write a
 * function that will look at the current state
 * and check for each individual win condition.
 *
 * Horizontal is easy because we can examine
 * each nested array individually. Vertical wins
 * mean comparing positions across all 3 nested
 * arrays. Diagonal wins mean comparing different
 * places across all 3 nested arrays.
 *
 * If any of them are met, it should return the
 * letter that won. Otherwise, it should return
 * false
 */

export function isGameWon(state) {
    var isWon = false;
    var winningLetter= " ";
    for (var index = 0; index < state.length; index++) {
      if (state[index][0] === state[index][1] &&
         state[index][0] === state[index][2] &&
          state[index][0] !== ' ') {
          isWon = true;//Horizontal win
          winningLetter = state[index][0];

      }
      if (state[0][index] === state[1][index] &&
          state[0][index] === state[2][index] &&
          state[0][index] !== ' ') {
          isWon = true;//Vertical win
          winningLetter= state[0][index];

      }
    }
    if (!isWon) {
        if((state[0][0] === state[1][1] &&
            state[0][0] === state[2][2]) &&
            state[0][0] !== ' ' ||
            (state[0][2] === state[1][1] &&
            state[0][2] === state[2][0]) &&
            state[0][2] !== ' '){
            isWon=true;
            winningLetter = state[1][1];
        }
    }
  return winningLetter;
}

/**
 * Now that we've got our bases covered, we
 * need to piece them together into an actual
 * game.
 *
 * In here, you'll need to define several things.
 *
 * 1: Log out some kind of welcome message when they
 * first run the game.
 *
 * 2: Ask for each player's name and create them by
 * using our Player constructor. Save these in an
 * array of players.
 *
 * 3: Create the initial state of the game. You need
 * to track who's turn it is, whether or not the game
 * has been won, et cetera. I've provided the initial
 * board state.
 *
 * 4: Use a while loop to determine if the game is still
 * going on. If it is, first display the board by
 * calling drawBoard. Then use getPlayerMove to ask the
 * current player for their move. Use validateMove to
 * verify that the move is valid. If it isn't, ask
 * the same player again until they pick a valid move.
 *
 * 5: Once you receive a valid move, change the state
 * of the game to reflect that move by setting their
 * letter to the appropriate place. Then, call isGameWon
 * to see if someone has won. If they have, congratulate
 * them and hop out of the while loop. Otherwise,
 * keep going.
 *
 * 6: Call emptySpotsLeft to see if the board is full.
 * If it is, end the game as a tie and come out of the
 * while loop. If it isn't, let the loop keep going.
 */

function runGame() {
  // DISPLAY WELCOME BANNER
  console.log("It's Tic-Tac-Toe!");

  // ASK FOR PLAYER NAMES AND CREATE PLAYERS
    var players = [2];
    players[0] = new Player(readlineSync.question("First player, what is your name?"), "X");
    players[1] = new Player(readlineSync.question("Second player, what is your name?"), "O");

    // CREATE INITIAL GAME STATE
    var gameBoard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];

    var winningPlayer;
    // WHILE LOOP FOR WHEN GAME IS NOT WON
     while (isGameWon(gameBoard) === " " && emptySpotsLeft(gameBoard)) {

        // GET MOVE FOR CURRENT PLAYER
        // UPDATE CURRENT PLAYER
        for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
          // DISPLAY BOARD
          drawBoard(gameBoard);
            if (emptySpotsLeft(gameBoard)) {
               var move = getPlayerMove(gameBoard, players[playerIndex]);

                // UPDATE gameBoard with new move
                gameBoard[move.row-1][move.column-1] = players[playerIndex].letter;

                // CHECK FOR WIN CONDITION
                if (isGameWon(gameBoard) !== " ") {
                    winningPlayer = players[playerIndex];
                }
              }
                // CHECK FOR MOVES LEFT
                if (!emptySpotsLeft(gameBoard) || winningPlayer !== undefined) {
                    break;
                }
        }
    }
    // CONGRATULATE WINNER OR DECLARE IT A TIE
    drawBoard(gameBoard);
    console.log("**GAME OVER**")
    if (winningPlayer !== undefined) {
        console.log(winningPlayer.name + " has won!");
    } else {
        console.log("The game has ended in a tie.");
    }
}

/**
 * Finally, we call our runGame function so that
 * the game actually starts.
 */
 runGame();
