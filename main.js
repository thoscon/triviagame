// Globals
let gameState = null;
let correctAnswer = null;
let currentQuestion = null;
let answerText = null;
let roundCountdown = 10;
let betweenRound = 3;
let roundTimer = 10;
let nextRoundTimer = 3;
let score = 0;
let rightAnswer = 2; //setting to 2 because 1 is right 0 is wrong
let phrases = ["Alright let's go!","Game time!","Let's do this!","Ready or not!",
"Here we go!","Bring it on!","Go for it!","All in!","Up and at 'em!","You got this!",
"Just do it!","No fear, no limits!","Feel the fire!","Time to shine!","Dream big!",
"Stay gold!","Make it count!","Full speed ahead!","Keep it up!","Rise and shine!"];
var startgame = document.getElementById("startbutton");

//INITIAL PAGE LOAD
function onPageLoad() {
    //first time to run the game, don't filter out questions that have been asked as the objects will reset
    currentQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    updateQuestion();
  }

// on initial page load the gamestate is 'initial'
window.onload = onPageLoad;

function game(){
    switch (gameState) {
        case "initial":
            break;

        case "newgame":
            //update
            //set the score to 0
            score = 0;
            if (nextRoundTimer - 1 > 0){
                //nothing
            }
            else{
                //set the countdown to roundCountdown (the config for a new round)
                roundTimer = roundCountdown;
                //set the game state to in round        
                gameState = "round";
                rightAnswer = 2; //reset the right answer flag
                updateQuestion(); //get a new question
            }
            ////////////////////////////////////////////////
            //draw 
            ////////////////////////////////////////////////
            //hide the initial splash screen 
            var gamecontainer = document.getElementById("splashscreen");
            gamecontainer.classList.add("d-none");

            var gamecontainer = document.getElementById("lostscreen");
            gamecontainer.classList.add("d-none");


            //show the next round screen with the timer and hide the main container 
            var betweenroundsscreen = document.getElementById("betweenrounds");
            betweenroundsscreen.classList.remove("d-none");
            document.getElementById("betweenroundscountdown").innerText = nextRoundTimer;
            document.getElementById("score").innerHTML = "score: " + score;

            //update the timer
            nextRoundTimer --;   
          break;





        case "nextround":
            ////////////////////////////////////////////////
            //update 
            ////////////////////////////////////////////////
            //if the screen displayed first time set the phrase to show
            if (nextRoundTimer === betweenRound){
                currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                document.getElementById("betweenroundsheader").innerText = currentPhrase;   
                document.getElementById("dyanmicbetweentext").innerText = "Get ready for the next question!"; 
            }

            //if there is still time left on the nextroundtimer, just subtract 1
            if (nextRoundTimer - 1 > 0){
            //select a new phrase at random each screen
             }
            else{
                //set the countdown to roundCountdown (the config for a new round)
                roundTimer = roundCountdown;
                //set the game state to in round        
                gameState = "round";
                rightAnswer = 2; //reset the right answer flag
                updateQuestion(); //get a new question
            }
            

            


            ////////////////////////////////////////////////
            //draw 
            ////////////////////////////////////////////////
            //hide the game screen
            var gamecontainer = document.getElementById("gamecontainer");
            gamecontainer.classList.add("d-none");
            //show the next round screen with the timer and hide the main container 
            var betweenroundsscreen = document.getElementById("betweenrounds");
            lostscreen.classList.add("d-none");
            betweenroundsscreen.classList.remove("d-none");
            document.getElementById("betweenroundscountdown").innerText = nextRoundTimer;   
            document.getElementById("score").innerHTML = score;

            //update the timer: 
            nextRoundTimer --;
           break;



        case "round":
             //update
            if (roundTimer - 1 > 0){
                //nothing
            }
            else{
                //set the game state to the timeup screen        
                gameState = "timeup";
            }

            if (rightAnswer == 1){
                updateMessage('Yes! You got it!', 'green');
                gameState = "nextround";
                nextRoundTimer = betweenRound;

            }
            else if (rightAnswer == 0){
                updateMessage('Oh no... wrong. It was ' + answerText, 'red');
                gameState = "gameover";
            }
            ////////////////////////////////////////////////
            //draw 
            ////////////////////////////////////////////////
            //hide the next round screen 
            //draw the countdown
            document.getElementById("countdown").innerText = "Time: " + roundTimer;    

            //draw the question
            document.getElementById("question").innerText = currentQuestion.text;

            //draw the answers
            document.getElementById("answer1").innerText = currentQuestion.answer1.text;
            document.getElementById("answer2").innerText = currentQuestion.answer2.text;
            document.getElementById("answer3").innerText = currentQuestion.answer3.text;
            document.getElementById("answer4").innerText = currentQuestion.answer4.text;
            document.getElementById("score").innerHTML = "Score: " + score;

            var betweenroundsscreen = document.getElementById("betweenrounds");
            betweenroundsscreen.classList.add("d-none");
            //show the game screen
            var gamecontainer = document.getElementById("gamecontainer");
            gamecontainer.classList.remove("d-none");

            roundTimer --;

           break;


        case "timeup":
            //update
            updateMessage('Oh no! Time is up!', 'red');
            //then go to next round
            gameState = "gameover";
            break;
            
        case "gameover":
            //update
            //draw
            var gamecontainer = document.getElementById("gamecontainer");
            gamecontainer.classList.add("d-none");
            var gamecontainer = document.getElementById("lostscreen");
            gamecontainer.classList.remove("d-none");
            break;
      }
    }


function updateQuestion(){
    // get a random question
    //filter out the questions that we have shown
    filteredQuestions = allQuestions.filter(question => !question.shown);
    //get the new current question based on the filtered results 
    currentQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    //update the current question to be shown=true so we don't show it next time
    currentQuestion.shown = true;

    resetAllStyles();
    // set the correct answer
    if (currentQuestion.answer1.correct === true){
        correctAnswer = 1;
        answerText = currentQuestion.answer1.textl;
    }
    else if (currentQuestion.answer2.correct === true){
        correctAnswer = 2;
        answerText = currentQuestion.answer2.text;
    }
    else if (currentQuestion.answer3.correct === true){
        correctAnswer = 3;
        answerText = currentQuestion.answer3.text;
    }
    else{
        correctAnswer = 4;
        answerText = currentQuestion.answer4.text;
    }
}

//////////////
//UTILITIES
/////////////
function updateMessage(message, styling){
    var element = document.getElementById("result");
    if (styling === 'red'){
        element.className = "col text-center h5 text-danger";
    }
    else if (styling === 'green'){
        element.className = "col text-center h5 text-success";
    }   
    element.innerText = message;
}

function resetAllStyles(){
    var resulttext = document.getElementById("result");
    resulttext.className = "col text-center h5";
    resulttext.innerText = '';
    var button1 = document.getElementById("answer1");
    button1.className = "col btn btn-primary m-2 btn-primary";
    var button2 = document.getElementById("answer2");
    button2.className = "col btn btn-primary m-2 btn-primary";
    var button3 = document.getElementById("answer3");
    button3.className = "col btn btn-primary m-2 btn-primary";
    var button4 = document.getElementById("answer4");
    button4.className = "col btn btn-primary m-2 btn-primary";
}


function disableAllButtons(){
    var button1 = document.getElementById("answer1");
    button1.classList.add("disabled");
    var button2 = document.getElementById("answer2");
    button2.classList.add("disabled");
    var button3 = document.getElementById("answer3");
    button3.classList.add("disabled");
    var button4 = document.getElementById("answer4");
    button4.classList.add("disabled");
}

//BUTTON EVENT LISTENERS

answer1.addEventListener("click", function() {
    let thisanswer = 1;
    var element = document.getElementById("answer1");
    if (thisanswer == correctAnswer) {
        element.className = "col btn btn-primary m-2 btn-success disabled";
        rightAnswer = 1;
        score = score + 1;
    }
    else {
        element.className = "col btn btn-primary m-2 btn-danger disabled";
        rightAnswer = 0;
    }
    disableAllButtons();
});

answer2.addEventListener("click", function() {
    let thisanswer = 2;
    var element = document.getElementById("answer2");
    if (thisanswer == correctAnswer) {
        element.className = "col btn btn-primary m-2 btn-success disabled";
        rightAnswer = 1;
        score = score + 1;
    }
    else {
        element.className = "col btn btn-primary m-2 btn-danger disabled";
        rightAnswer = 0;
    }
    disableAllButtons();  
});

answer3.addEventListener("click", function() {
    let thisanswer = 3;
    var element = document.getElementById("answer3");
    if (thisanswer == correctAnswer) {
        element.className = "col btn btn-primary m-2 btn-success disabled";
        rightAnswer = 1;
        score = score + 1;
    }
    else {
        element.className = "col btn btn-primary m-2 btn-danger disabled";
        rightAnswer = 0;
    }
    disableAllButtons();
});

answer4.addEventListener("click", function() {
    let thisanswer = 4;
    var element = document.getElementById("answer4");
    if (thisanswer == correctAnswer) {
        element.className = "col btn btn-primary m-2 btn-success disabled";
        rightAnswer = 1;
        score = score + 1;
    }
    else {
        element.className = "col btn btn-primary m-2 btn-danger disabled";
        rightAnswer = 0;
    }
    disableAllButtons();
});


//initial splash button listener
startgame.addEventListener("click", function() {
    gameState = 'newgame';
    });

//try again screen button listener 
restartbutton.addEventListener("click", function() {
    roundTimer = 10;
    nextRoundTimer = 3;
    gameState = 'newgame';
    });

//Game loop, run every second
setInterval(game, 1000);