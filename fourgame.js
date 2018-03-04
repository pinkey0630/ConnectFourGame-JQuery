var player1 = prompt("Player One: Enter your Name, you will be Blue");
var player2 = prompt("Player Two: Enter your Name, you will be Gray");
var player1Color = 'rgb(135,174,209)';
var player2Color = 'rgb(146,150,153)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum) {
  console.log("You won starting at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function reportColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var colorReport = reportColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = reportColor(row, colIndex);

    if (colorReport === 'rgb(242, 198, 206)') {
      return row;
    }
  }
}

function colorMatchCheck(one, two,three,four) {
  return (one === two && two === three && three === four && one !== 'rgb(242, 198, 206)' && one !== undefined);
}

function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(reportColor (row,col),reportColor(row, col+1),reportColor(row, col+2), reportColor(row, col+3))) {
        console.log('horizonal');
        reportWin(row,col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (var col = 0; col < 6; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(reportColor (row,col),reportColor(row+1, col),reportColor(row+2, col), reportColor(row+3, col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (var col = 0; col < 6; col++) {
    for (var row = 0; row < 6; row++) {
      if (colorMatchCheck(reportColor (row,col),reportColor(row+1, col+1),reportColor(row+2, col+2), reportColor(row+3, col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return true;
      } else if (colorMatchCheck(reportColor(row,col),reportColor(row-1,col+1),reportColor(row-2,col+2),reportColor(row-3,col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function clear() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 6; col++) {
      changeColor(row,col,'rgb(242, 198, 206)');
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + ", it is your turn, pick a column to drop it!");

$('.board button').on('click', function() {
  var col = $(this).closest('td').index();

  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail,col,currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName + ", You have won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    alert("YOU WON! Click START button to refresh");
  }

  currentPlayer = currentPlayer * (-1);

  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName + ", it is your turn.");
    currentColor = player1Color;

  } else {
    currentName = player2;
    $('h3').text(currentName + ", it is your turn.");
    currentColor = player2Color;
  }
})

$('.start').on('click', function() {
  clear();
  $('h1').text("Pick a column to drop it!");
  $('h3').text(currentName + ", it is your turn.");
})
