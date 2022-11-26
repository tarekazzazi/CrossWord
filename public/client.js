$(Ready);
// Global variables
let i = 0;
// Array of Objects
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
  {
    level: 4,
    words: ["do00-g", "wolf-", "ggh-"],
  },
  {
    level: 5,
    words: ['cat','-on','-now','soon'],
  },
  {
    level: 6,
    words: ['at','-on','-nw','son'],
  },
];

function Ready() {
  // move into own function
  renderLandingPage();
  $(document).on("keydown", keyupfunction);
  $("li").on("click", handleClickListner);
}

function handleClickListner(){
  i = $(this).val();
  console.log('this.val >>',i);
  selectLevel({i: i});
}

function renderLandingPage() {

  for (l of levels) {
    console.log(l.level);
  $('.levelSelectList').append(`    
  <div class="level-card">
  <li value="${l.level-1}">level ${l.level}</li>
  </div>`);
  }
}

function changecolor() {
  if ($(this).hasClass("select")) {
    // Removes Color from selected Square
    console.log("Remove Class Select");
    $(this).removeClass("select");
  } else {
    console.log("Add Class Select")
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
    // sets a limit on i
              // eventually should be removed and replaced with array.length
    if (i !== 0) {
      i = i - 1;
      console.log(i);
    }

    $(`ul div:eq(${i})`).css("background-color", "brown");
    // sets other li background color to default that are > or < the index
    $(`ul div:gt(${i})`).css("background-color", "rgb(22, 28, 60)");
    $(`ul div:lt(${i})`).css("background-color", "rgb(22, 28, 60)");

  } else if (code == 40) {
    // sets a limit on i
    if (i !== 5) {
    i = i + 1;
    console.log(i);
    }

    $(`ul div:eq(${i})`).css("background-color", "brown");
   // sets other li background color to default that are > or < the index
    $(`ul div:gt(${i})`).css("background-color", "rgb(22, 28, 60)");
    $(`ul div:lt(${i})`).css("background-color", "rgb(22, 28, 60)");
  }
   if (code == 13) {
    console.log(i);
    selectLevel({i: i})
  }
}

function selectLevel({i}) {
  const level = levels[i];
  console.log(level);
  start({ level: level });
}

function start({ level }) {
  $(".levelSelectWrapperBg").remove();
  // min 16 letters
  const letters = [];
  console.log('level is',level);

  // splits answer strings up and pushes them into a new array as individual letter strings
  for (an of level.words) {
    l = an.split("");
    letters.push(...l);
  }

  // Render
  for (const letter of letters) {
    // Appends a div without a value where ever a - is in a string
    if (letter === "-") {
      $(".game-board-container").append(`<div class="grid-item blocker"></div>`);
    } else {
      $(".game-board-container").append(
        `<div class="grid-item change-color">${letter}</div>`
      );
    }
  }
  $(".change-color").on("click", changecolor);
}
