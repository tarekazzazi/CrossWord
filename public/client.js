$(Ready);
// Global variables
let i = 0;

function Ready() {
  // move into own function
  $(document).on("keydown", keyupfunction);

  $("li").on("click", selectLevel);
}
function landingPage() {
  console.log(levels);
}

function changecolor() {
  console.log("in change color");
  if ($(this).hasClass("select")) {
    // Removes Color from selected Square
    console.log("Remove Class Select");
    $(this).removeClass("select");
  } else {
    // Adds color to selected square
    $(this).addClass("select");
  }
}

function keyupfunction(e) {
  e.preventDefault();
  console.log("KEYYS ARE UP");
  // Move keyfunction into here
  // use e.which
  var code = e.keyCode || e.which;

  // If up arrow pressed do something
  // convert to switch statement
  if (code == 38) {
    //Do something
    // sets a limit on i
    if (i !== 0) {
      i = i - 1;
      console.log(i);
    }

    $(`ul li:eq(${i})`).css("background-color", "brown");
    // background color a class
    $(`ul li:gt(${i})`).css("background-color", "black");
    $(`ul li:lt(${i})`).css("background-color", "black");
  } else if (code == 40) {
    // sets a limit on i
    // if (i !== 3) {
    i = i + 1;
    console.log(i);
    // }

    $("li + li").css("background-color", "brown");
    // sets the range between li elements to make background black
    $(`ul li:gt(${i})`).css("background-color", "black");
    $(`ul li:lt(${i})`).css("background-color", "black");
  }
}

function selectLevel() {
  let i = $(this).val();
  console.log(i);
  const levels = [
    {
      level: 1,
      words: ["c-at", "arm-", "tr-y", "f-ur"],
    },
    {
      level: 2,
      words: ["do-g", "wolf-", "-", "-"],
    },
    {
      level: 3,
      words: ["do-g", "wolf-", "-"],
    },
  ];

  const level = levels[i];
  start({ level: level });
}

function start({ level }) {
  $(".levelSelect").remove();
  // min 16 letters
  const letters = [];
  console.log(level);

  // splits answer strings up and pushes them into a new array as individual letter strings
  for (an of level.words) {
    l = an.split("");
    letters.push(...l);
  }

  // Render
  for (const letter of letters) {
    // Appends a div without a value where ever a - is in a string
    if (letter === "-") {
      $(".game-board-container").append(`<div class="grid-item"></div>`);
    } else {
      $(".game-board-container").append(
        `<div class="grid-item">${letter}</div>`
      );
    }
  }
  $(".grid-item").on("click", changecolor);
}
