$(Ready);

function Ready() {
  $(".grid-item").on("click", changecolor);
}

function changecolor() {
  if ($(this).hasClass("select")) {
    // Removes Color from selected Square
    console.log("Remove Class Select");
    $(this).removeClass("select");
  } else {
    // Adds color to selected square
    $(this).addClass("select");
  }
}
