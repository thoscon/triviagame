
// Example of an object
let question1 = {
    text: "According to the nursery rhyme, what fruit did Little Jack Horner pull out of his Christmas pie?",
    answer1: {
        text: 'Plum',
        correct: true,},
    answer2: {
        text: 'Apple',
        correct: false,},
    answer3: {
        text: 'Peach',
        correct: false,},
    answer4: {
        text: 'Pear',
        correct: false,},
    shown: false,
};

let question2 = {
    text: "What caused the titular mascot of Yo-Kai Watch, Jibanyan, to become a yokai?",
    answer1: {
        text: 'Ate one too many chocobars',
        correct: false,},
    answer2: {
        text: 'Through a magical ritual',
        correct: false,},
    answer3: {
        text: 'When he put on the harmaki',
        correct: false,},
    answer4: {
        text: 'Being run over by a trucker',
        correct: true,},
    shown: false,
};


let question3 = {
    text: "Who directed the Kill Bill movies?",
    answer1: {
        text: 'Arnold Schwarzenegger',
        correct: false,},
    answer2: {
        text: 'Quentin Tarantino',
        correct: true,},
    answer3: {
        text: 'David Lean',
        correct: false,},
    answer4: {
        text: 'Stanley Kubrick',
        correct: false,},
    shown: false,
};


var allQuestions = [question1, question2, question3];


// Globals
let gameState = null;
let correctAnswer = null;
let currentQuestion = null;
let roundCountdown = 10;
let betweenRound = 3;
let roundTimer = 10;
let nextRoundTimer = 3;
let score = 0;
let rightAnswer = 2; //setting to 2 because 1 is right 0 is wrong

var startgame = document.getElementById("startbutton");

//INITIAL PAGE LOAD
function onPageLoad() {
    currentQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    updateQuestion();
  }

// on initial page load the gamestate is 'initial'
window.onload = onPageLoad;

function game(){
    console.log(gameState);
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
            document.getElementById("score").innerHTML = score;

            //update the timer
            nextRoundTimer --;   
          break;





        case "nextround":
            ////////////////////////////////////////////////
            //update 
            ////////////////////////////////////////////////
            //if there is still time left on the nextroundtimer, just subtract 1
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
            
            document.getElementById("betweenroundsheader").innerText = "Cool!";   
            document.getElementById("dyanmicbetweentext").innerText = "Get ready for the next question!";   
            


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
                updateMessage('Yes, you got it!', 'green');
                gameState = "nextround";
                nextRoundTimer = betweenRound;

            }
            else if (rightAnswer == 0){
                updateMessage('Oh no... wrong', 'red');
                gameState = "gameover";
            }
            ////////////////////////////////////////////////
            //draw 
            ////////////////////////////////////////////////
            //hide the next round screen 
            //draw the countdown
            document.getElementById("countdown").innerText = roundTimer;    

            //draw the question
            document.getElementById("question").innerText = currentQuestion.text;

            //draw the answers
            document.getElementById("answer1").innerText = currentQuestion.answer1.text;
            document.getElementById("answer2").innerText = currentQuestion.answer2.text;
            document.getElementById("answer3").innerText = currentQuestion.answer3.text;
            document.getElementById("answer4").innerText = currentQuestion.answer4.text;
            document.getElementById("score").innerHTML = score;

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
    currentQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    resetAllStyles();
    // set the correct answer
    if (currentQuestion.answer1.correct === true){
        correctAnswer = 1
    }
    else if (currentQuestion.answer2.correct === true){
        correctAnswer = 2
    }
    else if (currentQuestion.answer3.correct === true){
        correctAnswer = 3
    }
    else{
        correctAnswer = 4
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