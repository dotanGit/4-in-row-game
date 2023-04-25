// Prompt for player names and set their respective colors
var player1 = prompt("Player One: Enter Your Name , you will be blue color");
var player1color = 'rgb(86, 151, 255)';
var player2 = prompt("Player Two: Enter Your Name , you will be red color");
var player2color = 'rgb(237, 45, 73)';

// Set game_on variable to true and select the table rows
var game_on = true;
var table = $('table tr');

// Function to report win with row and column number
function reportWin(rowNum, colNum) {
  console.log("you won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

// Function to change the color of a button in the table
function changeColor(rowIndex, colIndex, color) {
  table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// Function to return the color of a button in the table
function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Function to check the bottom row of a column and return the first empty row
function checkBottom(colIndex) {
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

// Function to check if four colors match and are not empty
function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// Function to check for a horizontal win
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
        console.log('horiz');
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Function to check for a vertical win
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) { // Fix: row should be incremented by 1
      if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
        console.log('vertical');
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}


// Check for a diagonal win
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      // Check for a diagonal win going down and to the right
      if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
        console.log('diag');
        reportWin(row, col); // Report the win
        return true;
      }
      // Check for a diagonal win going up and to the right
      else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
        console.log('diag');
        reportWin(row, col); // Report the win
        return true;
      }
      else {
        continue;
      }
    }
  }
}

// Set initial game state
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

// Set initial message for player 1
$('h3').text(player1 + ', it is your turn. Pick a column to drop in the chip!');

// Handle user input when a board button is clicked
$('.board button').on('click', function() {
  var col = $(this).closest('td').index(); // Get the index of the column
  var bottomAvail = checkBottom(col); // Find the bottom-most available row in the column
  changeColor(bottomAvail, col, currentColor); // Change the color of the corresponding circle

  // Check for a win after the circle is dropped
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {

    // Disable all buttons
    $('.board button').attr('disabled', true);

    $('h1').text(currentName + ', you have won!'); // Update the win message
    $('h3').fadeOut('fast'); // Hide the player turn message
    $('h2').fadeOut('fast'); // Hide the player colors message
  }

  // Switch to the other player's turn
  currentPlayer *= -1;
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName + ', it is your turn.'); // Update the turn message
    currentColor = player1color;
  } else {
    currentName = player2;
    $('h3').text(currentName + ', it is your turn.'); // Update the turn message
    currentColor = player2color;
  }
});

// Handle refreshing the page
$('#refresh').on('click', function() {
  location.reload();
});

