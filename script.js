let timer;
let seconds;
let minute;
let workTimer = 1;
let isNextBreakTimer = true;
let isFirstSecond = true;

function setClock(min, sec){
    $("#countdown").text(min);
    $(".point").css("animation-duration", sec);
}

$(document).ready(function() {
  $('input').on('keydown', function(e) {
    e.preventDefault();
  });
  $("#pauseButton").prop("disabled", true);
  $("#resetButton").prop("disabled", true);

  setClock("25:00", "1500s");
});

function setDisabledButton(start, pause, reset){
    $("#startButton").prop("disabled", start);
    $("#pauseButton").prop("disabled", pause);
    $("#resetButton").prop("disabled", reset);
}

function start(){
    timer = setInterval(secondsManager, 1000);
    setDisabledButton(true, false, false);
}

function pause(){
    clearInterval(timer);
    $(".point").css("animation-play-state", "paused");
    isFirstSecond = true;
    setDisabledButton(false, true, false);
}

function reset(){
    clearInterval(timer);
    setClock("25:00", "1500s");
    $(".point").css("animation", "inner-circle linear infinite paused");
    //$("#countdown").text("25:00");

    workTimer = 1;
    setDisabledButton(false, true, true);
}

function breakManager(){
    if(workTimer % 4 == 0 && isNextBreakTimer){
        workTimer = 0;
        // $("#countdown").text("30:00");
        // $(".point").css("animation-duration", "1800s");
        setClock("30:00", "1800s");

        isNextBreakTimer = false;
    } else if(isNextBreakTimer){
        workTimer++;
        setClock("5:00", "300s");
        isNextBreakTimer = false;
    } else{
        isNextBreakTimer = true;
        setClock("25:00", "1500s");
    }
    start();
}

function finishedRound(){

    for(var i = 0; i < 5; i++){
        setTimeout(
            function(){
                $('.blink').fadeOut(500);
                $('.blink').fadeIn(500);
            }, 1000);
    }
    breakManager();
}

function decrementMinutes(time){
    minutes = time[0];
    minutes--;
}

function secondsManager(){
    let timestr = $("#countdown").text();
    time = timestr.split(":");

    seconds = time[1];
    minutes = time[0];

    if(isFirstSecond){
        $(".point").css("animation-play-state", "running");
        isFirstSecond = false;
    }
    if(seconds === '00' && minutes != '0'){
        decrementMinutes(time);
        seconds = '59';
    } else if(seconds === '00' && minutes === '0'){
        $(".point").css("animation-play-state", "paused");
        isFirstSecond = true;
        clearInterval(timer);
        finishedRound();
        return;
    }
    else {
        seconds = parseInt(seconds, 10);
        seconds--;
    }
    (seconds >= 0 && seconds <= 9) ? seconds = '0' + seconds : seconds;
    $("#countdown").text(minutes + ":" + seconds);
}
