$(Ready);

function Ready() {
  $(document).on("load",renderLandingPage());
  $(document).on("keydown", keyupfunction);
  $("li").on("click", handleClickListner);
  $('#close').on('click', handleDetailClose);
}

// Global variables
let i = 0;
  // sets the length of each grid row
  let gridRowLength = 4;
// Array of Objects
// Animal themed crossword
const levels = [
  {
    level: 1,
    questions: [
    "An animal with wings, feathers, and two legs", 
    "A name for a small and weak animal",
    "A wild cat found in the northern latitudes of North America"
  ],
    // ? divs where I want no letter
    words: [
    ["b","i","r","d"],
    ["f","-","u","p"],
    ["l","y","n","x"],
    ["z","c","t","-"],
  ],
  },
  {
    level: 2,
    questions: ["?"],
    words: [
    "----",
    "----",
    "----",
    "----",
  ],
  },
  {
    level: 3,
    questions: ["?"],
    words: [
    "----",
    "----",
    "----",
    "----",
    ],
  },
  {
    level: 4,
    questions: ["?"],
    words: [
    "----",
    "----",
    "----",
    "----",
    ],
  },
  {
    level: 5,
    questions: ["?"],
    words: [
    "----",
    "----",
    "----",
    "----",
    ],
  },
  {
    level: 6,
    questions: ["?"],
    words: [
    "----",
    "----",
    "----",
    "----",
    ],
  },
  {
    level: 7,
    questions: ["?"],
    words: [
    "----",
    "----",
    "----",
    "----",
    ],
  },
  {
    level: 8,
    questions: ["?"],
    words: [
    "----",
    "----",
    "----",
    "----",
    ],
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
          start({ level: levels[i] });
          $(document).off("keydown");         
        break;
      case 82:
        window.location.reload();
      default:
        break;
    }
  
};

function handleClickListner(){
  i = $(this).val();
  $(document).off("keydown");  
  start({ level: levels[i] });
}

function handleDetailClose(){
  $('.detail-container').remove();
}

function start({ level }) {
    // this function is doing a lot of different things
    // try to condese

  /** Renders questions **/
  $(".levelSelectWrapperBg").remove();
  console.log('this is the LVL',level);
  for (q of level.questions){
  $(".question").append(`<li style="font-size:13px; text-align:left;">${q}</li> <br/>`);
  }
  $(".submit").on("click", checkUserAnswer);

  /** Renders Divs from levels array of objects **/
  let loopTime = 4;
  // Runs 4 times appending a new div
  for (let i = 0; i < loopTime; i++) {
      console.log(level.words[[i]]);
      $(".game-board-container").append(`<div class="grid-row-wrapper" id="this${i}"></div>`)
      // Inner loop targets the containers unique id
      // appends that row of letters to the dom
    for(row of level.words[i]){
      console.log("this", row)
      $(`#this${i}`).append(`<div class="grid-item change-color">${row}</div>`);

    }
  }

  /** Makes sure level stays 4x4 grid **/
  // make a 4 x 4 grid if words provided fail to = 16 with blank divs
  while(level.words.length < 16){
    level.words.push("-");
  }
  // removes exess divs greater than a 4 X 4 grid
  while(level.words.length > 16){
    level.words.pop(); 
  }
 
  $(".change-color").on("click", changecolor);
}
function selectRowOfLettersArea(){
  console.log('row of letters');

}
/* If Correct change select color to gold */
/* If Incorrect turn select color red and remove class */
function changecolor() {

  if ($(this).hasClass("select")) {
    // Removes Color from selected Square
    console.log("Remove Class Select");
    $(this).removeClass("select");
  } else{
    console.log("Add Class Select")
    // Adds color to selected square
    $(this).addClass("select");
    }
  
}

function checkUserAnswer() {
  console.log("CHECKING...");
  // variables
  const answer = $(".select").text();
  console.log(answer);
  // 0 must change to index of levels and words
  if (answer === levels[0].words[0] ) {
    console.log("SUCESS BIRD IS THE WORD");
    $(".select").css("background-color", "#ffd700");
  }
}

