let timer;
let seconds;
let minute;
let workTimer = 1;
let isNextBreakTimer = true;

$(document).ready(function() {
  $('input').on('keydown', function(e) {
    e.preventDefault();
  });
  $("#pauseButton").prop("disabled", true);
  $("#resetButton").prop("disabled", true);
  // $("#countdown").text("25:00");
  // $(".point").css("animation-duration", "1500s");

  $("#countdown").text("1:00");
  $(".point").css("animation-duration", "60s");
});

function setDisabledButton(start, pause, reset){
    $("#startButton").prop("disabled", start);
    $("#pauseButton").prop("disabled", pause);
    $("#resetButton").prop("disabled", reset);
}

function start(){
    timer = setInterval(timeManager, 1000);

    setDisabledButton(true, false, false);
    $(".point").css("animation-play-state", "running");
}

function pause(){

    clearInterval(timer);
    $(".point").css("animation-play-state", "paused");

    setDisabledButton(false, true, false);
}

function reset(){
    clearInterval(timer);
    $(".point").css("animation", "inner-circle linear infinite paused");
    $("#countdown").text("25:00");
    workTimer = 1;
    setDisabledButton(false, true, true);
}

function timeManager(){
    secondsManager();
    $("#countdown").text(minutes + ":" + seconds);
}

function breakManager(){
    if(workTimer % 4 == 0 && isNextBreakTimer){
        workTimer = 0;
        // $("#countdown").text(30 + ":" + 00);
        // $(".point").css("animation-duration", "1800s");
        clearInterval(timer);
        $("#countdown").text("3:00");
        $(".point").css("animation-duration", "180s");


        isNextBreakTimer = false;
    } else if(isNextBreakTimer){
        workTimer++;
        // $("#countdown").text(5 + ":" + 00);
        // $(".point").css("animation-duration", "300s");
        clearInterval(timer);
        $("#countdown").text("0:30");
        $(".point").css("animation-duration", "30s");

        isNextBreakTimer = false;
    } else{
        // $("#countdown").text(25 + ":" + 00);
        // $(".point").css("animation-duration", "1500s");
        clearInterval(timer);

        $("#countdown").text("1:00");
        $(".point").css("animation-duration", "60s");
        $(".point").css("animation", "inner-circle linear infinite paused");
        isNextBreakTimer = true;
    }
    console.log("isNextBreakTimer: " + isNextBreakTimer);
    console.log("workTimer: " + workTimer);
    timer = setInterval(timeManager, 1000);
    $(".point").css("animation-play-state", "running");
    secondsManager();
}

function decrementMinutes(time){
    minutes = time[0];
    minutes--;
}

function secondsManager(){
    let timestr = $("#countdown").text();
    console.log(timestr);
    time = timestr.split(":");

    seconds = time[1];
    minutes = time[0];

    if(seconds === '00' && minutes != '0'){
        decrementMinutes(time);
        seconds = '59';
    } else if(seconds === '00' && minutes === '0'){
        $(".point").css("animation", "inner-circle linear infinite paused");
        breakManager();
    }
    else {
        seconds = parseInt(seconds, 10);
        seconds--;
    }

    (seconds >= 0 && seconds <= 9) ? seconds = '0' + seconds : seconds;
}
