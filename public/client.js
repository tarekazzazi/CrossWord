$(Ready);

function Ready() {
  $(document).on("load",renderLandingPage());
  $(document).on("keydown", keyupfunction);
  $("li").on("click", handleClickListner);
  $('#close').on('click', handleDetailClose);
}

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
    words: ["dog", "wolf", "cow","crow"],
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
  {
    level: 7,
    words: ['at','-on','-w','son'],
  },
  {
    level: 8,
    words: ['hsdh','-jdks','-w--kk','son'],
  }
];

function renderLandingPage() {

  for (l of levels) {
    console.log(l.level);
  $('.levelSelectList').append(`    
  <div class="level-card">
    <li value="${l.level -1}">level ${l.level}</li>
  </div>`);
  }
}

function keyupfunction(e) {
  e.preventDefault();
  console.log("keydown");

  var code = e.keyCode || e.which;
  
   $(`ul div:eq(${i})`).css("background-color", "brown");
  // sets other li background color to default that are > or < the index
   $(`ul div:gt(${i})`).css("background-color", "rgb(22, 28, 60)");
   $(`ul div:lt(${i})`).css("background-color", "rgb(22, 28, 60)");

  // If up arrow pressed do something

    switch(code){
      case 38:
        // sets a limit on i
          if (i !== 0) {
            i = i - 1;
            console.log(i);
          }
        break;
      case 40:
        // sets a limit on i
          if(i < levels.length - 1) {
            i = i + 1;
            console.log(i);
          }
        break;
      case 13:
        console.log('level index >>><<<>>>',i);
          start({ level: levels[i] });
          $(document).off("keydown")
         
        break;
      case 82:
        window.location.reload();
      default:
        break;
    }
  
};
// merge into one function
function handleClickListner(){
  i = $(this).val();
  console.log('this.val >>',i);
  start({ level: levels[i] });
}

function handleDetailClose(){
  $('.detail-container').remove();
}
// End merge

function start({ level }) {
  $(".levelSelectWrapperBg").remove();

  // min 16 letters
  const letters = [];

  // splits word strings up and pushes them into a new array 
  // as individual letter strings
  for (an of level.words) {
    l = an.split("");
    letters.push(...l);
  }
  console.log('letters length',letters.length)
  // make a 4 x 4 grid if words provided fail to = 16 with blank divs
  while(letters.length < 16){
    letters.push("-");
  }
  // removes exess divs greater than a 4 X 4 grid
  while(letters.length > 16){
    letters.pop();  }
  // Render game board elements
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