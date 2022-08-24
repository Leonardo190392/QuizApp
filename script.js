let questions = [
    {
        "question": "Wer wurder Fusballer des Jahres 2010?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Lionel Messi",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Wie hoch ist der höchste Berg?",
        "answer_1": "2345m",
        "answer_2": "100m",
        "answer_3": "5032m",
        "answer_4": "8848m",
        "right_answer": 4
    },
    {
        "question": "Was ist die Hauptstadt von Spanien?",
        "answer_1": "Madrid",
        "answer_2": "Barcelona",
        "answer_3": "Valencia",
        "answer_4": "Berlin",
        "right_answer": 1
    },
    {
        "question": "Welche Nationalmannschaft wurde im Jahr 2006 Weltmeister im Fußball?",
        "answer_1": "Deutschland",
        "answer_2": "Frankreich",
        "answer_3": "Italien",
        "answer_4": "Spanien",
        "right_answer": 3
    },
    {
        "question": "Wie viele Bundesländer hat Deutschland?",
        "answer_1": "3",
        "answer_2": "16",
        "answer_3": "11",
        "answer_4": "13",
        "right_answer": 2
    },
    {
        "question": "Wo steht der Eifelturm?",
        "answer_1": "Paris",
        "answer_2": "Dortmund",
        "answer_3": "Rom",
        "answer_4": "Madrid",
        "right_answer": 1
    },
    {
        "question": "Wie viele Knochen hat ein Erwachsenenkörper?",
        "answer_1": "134",
        "answer_2": "238",
        "answer_3": "299",
        "answer_4": "206",
        "right_answer": 4
    }

];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('sound/correct.wav');
let AUDIO_FAIL = new Audio('sound/wrong.wav');


function init() {
    document.getElementById('quantity-question').innerHTML= questions.length;
    showQuestion();
}


function showQuestion() {

    if(gameIsOver()) {                                                                          //currentQuestion = aktuelle Frage zb 6 von 7 . Wenn currentQuestion größer oder gleich des gesamten Arrays ist dann else
        showEndscreen();        
    } else { 
        updateProgressbar();
        updateToNextQuestion();
    }
}

function gameIsOver(){
    return currentQuestion >= question.length                                                   // Funktion gibt immer true oder false raus 
}

function showEndscreen() {
    document.getElementById('end-screen').style = '';                                           // entfernt style = display none aus der index.html
    document.getElementById('question-body').style = 'display: none';                           // fügt die css eigenschaft hinzu
    document.getElementById('amount-of-questions').innerHTML = questions.length;                // zeigt im Endscreen ...von 7 an 7 ist die Länge das Arrays 
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.png';
}

function updateProgressbar() {
    let percent = (currentQuestion + 1) / questions.length;                                     // um den Fortschritt auszurechnen 1 von 7 = 0.14, 2 von 7 = 0.28 // +1 weil mit 0 anfängt zu rechnen so kommt man nicht auf 100 %
    percent = Math.round(percent * 100);                                                        // um das in Prozent anzugeben 14,070345.... Math.round rundet die Zahl aus der Klammer
    document.getElementById('progress-bar').innerHTML =` ${percent} %`;
    document.getElementById('progress-bar').style =` width: ${percent}%`;                       // zeigt die prozentzahl in der progress bar an
}

function updateToNextQuestion(){
    let question = questions[currentQuestion];

    document.getElementById('question-number').innerHTML = currentQuestion +1 ;                 // passt frage 1 von 7 an für jede Frage danach kommt dann 2 von 7
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber)) {                                           // wenn richtige Frage beantwortet
        AUDIO_SUCCESS.play();                                                                   // spielt den Sound aus der Variablen wenn richtig 
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;                                                                       // erhöht um 1 falls eine Antwort richtig ist ++ erhöht -- verringert
    } else{
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();                                                                      // spielt den Sound aus der Variablen wenn falsch
    }
    document.getElementById('next-button').disabled=false;
}

function rightAnswerSelected(selectedQuestionNumber) {                                          //  variable muss mitgegeben werden da die sie nur in answer deklariert ist
    return selectedQuestionNumber == question['right_answer']

}


function nextQuestion() {
    currentQuestion++;                                                                          // z.B. wird das array von 0 auf 1 erhöht
    document.getElementById('next-button').disabled=true;                                       // Button wird wieder deaktiviert
    resetAnswerButtons();
    showQuestion();

}

function resetAnswerButtons() {                                                                 // entfernt bei der nächsten frage die grünen und roten bg's bei answers
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');               // parentNode. damit greift man auf das div element ein drüber zu
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/education.jpg';                          // ändert das Bild
    document.getElementById('question-body').style = '';                                        // question-body wieder anzeigen
    document.getElementById('end-screen').style = 'display: none';                              // Endscreen ausblenden

    rightQuestions = 0;                                                                         // setzt richtige Antworten auf 0 
    currentQuestion = 0;                                                                        // setzt aktuelle Frage  auf 0    
    init();                                                                                     // ruft die Funktion auf die das ganze Spiel erstellt
}