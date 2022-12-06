$(Ready);

function Ready() {
  $(document).on("load",renderLandingPage());
  $(document).on("keydown", keydownfunction);
  $("li").on("click", handleClickListner);
  $('#close').on('click', handleDetailClose);
} 

// Global variables
let i = 0;
// Array of Objects
// Animal themed crossword
// Dashs represent no letter spaces
const levels = [
  {
    level: 1,
    questions: {
      vertical:["A name for a small and weak animal"],
      horizontal:[ "An animal with wings, feathers, and two legs", "A wild cat found in the northern latitudes of North America"   ],
    }
  ,
    words: [
    ["b","i","r","d"],
    ["f","-","u","p"],
    ["l","y","n","x"],
    ["z","c","t","-",],
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
  $(".selector-border").hide();
  for (l of levels) {
    console.log(l.level);
  $('.levelSelectList').append(`    
  <div class="level-card">
    <li value="${l.level -1}">level ${l.level}</li>
  </div>`);
  }
}

function keydownfunction(e) {
  e.preventDefault();
  console.log("keydown");

  var code = e.keyCode || e.which;
  
   $(`ul div:eq(${i})`).css("background-color", "brown");
  // sets other li background color to default that are > or < the index
   $(`ul div:gt(${i})`).css("background-color", "rgb(22, 28, 60)");
   $(`ul div:lt(${i})`).css("background-color", "rgb(22, 28, 60)");
  //  Switch key pressed
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
  // turns keydown function off so its inactive
  $(document).off("keydown");
  // Passes Start function level prop so it knows what level to render 
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

  for (q of level.questions.horizontal){
  $(".question").append(`<li style="font-size:13px; text-align:left;">${q}</li> <br/>`);
  }

  // Checks Answer
  $(".submit").on("click", checkUserAnswer);

  /** Renders Divs from levels array of objects **/
  let loopTime = 4;
  // Runs 4 times appending a new div
  for (let i = 0; i < loopTime; i++) {
      console.log(level.words[[i]]);
      $(".game-board-container").append(`<div class="grid-row-wrapper" id="this${i}"></div>`)
      // Inner loop targets the container and adds a unique id
      // Appends that array or row of letters to the dom
    for(row of level.words[i]){
      // Checks if a letter is a dash and appends a div with blocker class if true 
      // else appends letters
      if (row === "-") {
      $(`#this${i}`).append(`<div class="blocker"></div>`);
      }else {
      $(`#this${i}`).append(`<div class="grid-item change-color" value="${row}"><input type="text" class="txt-input change-color txtNumeric" maxlength="1"/></div>`);
      }
    }
  }
  // Prevents input with class to enter numbers 
  $('.txtNumeric').keydown(function (e) {

    if (e.shiftKey || e.ctrlKey || e.altKey) {
    
      e.preventDefault();
      
    } else {
    
      var key = e.keyCode;
      
      if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
      
        e.preventDefault();
        
      }

    }
    
  });

  /** Makes sure level stays 4x4 grid **/
  // make a 4 x 4 grid if words provided fail to = 16 with blank divs

  // removes exess divs greater than a 4 X 4 grid
  while(level.words.length > 16){
    level.words.pop(); 
  }
 
  // ** Game-Board-Element-Selectors  ** //
  $(".change-color").on("click", changecolor);

  // conditionally render grid-item
  // $(".grid-item").on("click", selectHorizontal);
  $(".grid-item").on("click",selectVertical);
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

function selectHorizontal() {
  // Check grid of rows if another row is already selected
  // Removes the row that isn't selected anymore
  if($(".game-board-container").children('div').hasClass("border")){
    // removes class border with any div that has it in the game-board-container
    $("div").parents().removeClass("border");
    $(this).parent().addClass("border");
  }else {
    $(this).parent().addClass("border");
  }

  // Selects child elements from parent border
  // Going to be used to compare the answer typed to 
  // the actual answer for the selected area
  console.log($(this).parents().children());
};

function selectVertical() {
  let columIndex;
      switch($(this).index()){
        case 0:
          columIndex = 4;
          break;
        case 1:
          columIndex = 3;
          break;
        case 2:
          columIndex = 2;
          break;
        case 3:
          columIndex = 1;
          break;
        default:
          console.log("no case selected : (");
        break;
      }
    $(".grid-item").children('div').removeClass("selector-border"); 
      // starts from index 1 which is the colum to far right
      // selects active squares by appending a new div to them called selector 
    $(`.grid-item:nth-last-child(${columIndex})`).append(`<div class="selector-border"> </div>`);
      // this currently displays the selector border
    $(".selector-border").show();  
}

function checkUserAnswer() {
  console.log("CHECKING...");
  const array1 = [];
  $('input.select').each(function () {
    // console.log($(this).val());
    array1.push($(this).val()); 
  });
  console.log(array1);

  // 0 must change to index of levels and words
  // if (answer === levels[0].words[0] ) {
  //   console.log("SUCESS BIRD IS THE WORD");
  //   $(".select").css("background-color", "#ffd700");
  // }
}

