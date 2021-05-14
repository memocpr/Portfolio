// question object constructor =================================
function Question(question, rightAnswer, wrongAnswer1, wrongAnswer2) {
    this.question = question;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
};

// question objects =================================
var quiz = [];
quiz[0] = new Question("Is javaScript is case sensitive?", "Yes", "No", "No Idea");
quiz[1] = new Question("Are Java and JavaScript same?", "No", "Maybe", "Yes");
quiz[2] = new Question("Which tag is used for header?", "h1", "p", "ul");
quiz[3] = new Question("Which tag is used for link?", "a", "link", "src");
quiz[4] = new Question("Which tag is used for js?", "script", "js", "style");
quiz[5] = new Question("String is immutable?", "yes", "no", "sometimes");
quiz[6] = new Question("JS is an OOP?", "yes", "maybe", "no");
quiz[7] = new Question("Which one is for only style?", "CSS", "JS", "HTML");
quiz[8] = new Question("Which one is not primitive datatype in JS?", "Object", "Number", "String");
quiz[9] = new Question("Which tag is popup box?", "alert", "console.log", "document");


// shuffle for answers =================================
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr;
}

// provide question =================================
var randomQuestion;
var answers = [];
let counter = quiz.length;

function btnProvideQuestion() {

    var randomNumber = Math.floor(Math.random() * quiz.length);

    randomQuestion = quiz[randomNumber]; //get random question

    for (let i = 0; i < quiz.length; i++) { // remove selected random question

        if (quiz[i] == quiz[randomNumber]) {
            quiz.splice(i, 1);
            counter--;
        }
    }

    answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2];

    shuffle(answers);

    document.getElementById("question").innerHTML = randomQuestion.question;

    document.getElementById("answerA").value = answers[0];
    document.getElementById("answerA").innerHTML = answers[0];

    document.getElementById("answerB").value = answers[1];
    document.getElementById("answerB").innerHTML = answers[1];

    document.getElementById("answerC").value = answers[2];
    document.getElementById("answerC").innerHTML = answers[2];

    let remain = document.getElementById("remain");
    remain.innerHTML = counter;

}

//  start to quiz =========================
let mainTag = document.querySelector("main");
let start = document.getElementById("start");

let startQuiz = () => {
    start.addEventListener("click", btnProvideQuestion);
    start.addEventListener("click", () => mainTag.style.visibility = "visible");
    start.addEventListener("click", nextBtn);
}

let nextBtn = () => {
    start.textContent = "Next";
    if (counter === 0) {
        score.innerHTML = currentScore + " Finish";
        start.style.visibility = "hidden";
        let node = document.createElement("p");
        node.textContent = "Quiz is over. Your score is : " + currentScore;
        document.body.replaceChild(node, mainTag);
    }
}

startQuiz();

// select answer =================================
function answerA_clicked() {
    var answerA = document.getElementById("answerA").value;
    checkAnswer(answerA);
}

function answerB_clicked() {
    var answerB = document.getElementById("answerB").value;
    checkAnswer(answerB);
}

function answerC_clicked() {
    var answerC = document.getElementById("answerC").value;
    checkAnswer(answerC);
}

// check answer =================================
function checkAnswer(answer) {
    if (answer == randomQuestion.rightAnswer) {
        adjustScore(true);
        btnProvideQuestion();
    } else {
        alert("Wrong Answer !");
        adjustScore(false);
        btnProvideQuestion();
    }
}

// calculate score =================================
var currentScore = 0;

function adjustScore(isCorrect) {

    if (isCorrect) {
        currentScore++;
    } else {
        if (currentScore > 0) {
            currentScore--;
        }
    }

    let score = document.getElementById("score");
    score.innerHTML = currentScore;

    if (counter === 0) {
        score.innerHTML = currentScore + " Finish";
        start.style.visibility = "hidden";
        let node = document.createElement("p");
        node.textContent = "Quiz is over. Your score is : " + currentScore;
        document.body.replaceChild(node, mainTag);

    }
}