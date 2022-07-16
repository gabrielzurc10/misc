var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#level-title").html("level "+level);

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut().fadeIn();
  var audio = new Audio("sounds/"+randomChosenColor+".mp3");
  audio.play();

  level++;
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("Success");

    if(currentLevel == gamePattern.length-1){
      setTimeout(nextSequence(), 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("Wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
    }, 200);

      $(document).keypress(function(event){
        if(started == false){
          nextSequence();
          started = true;
        }
      });
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  var audio = new Audio("sounds/"+userChosenColor+".mp3");
  audio.play();

  animatePress(userChosenColor);
});

$(document).keypress(function(event){
    if(event.key == 'a' && started == false) {
      nextSequence();
      started = true;
    }
});
