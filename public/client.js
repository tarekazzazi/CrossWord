$(Ready);

function Ready() {
  randomize();
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

function randomize() {
  // min 16 letters
  const letters = [];
  const answer = ["c-at", "arm-", "tr-y", "f-ur"];
  // splits answer strings up and pushes them into a new array as individual letter strings
  for (an of answer) {
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
