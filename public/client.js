$(Ready);

function Ready() {
  // randomize();
  $("li").on("click", selectLevel);
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
      words: ["do-g", "wolf-", "-"],
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
