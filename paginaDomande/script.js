const questions = [
    {
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"]
    },
    {
        question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"]
    },
    {
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"]
    },
    {
        question: "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "True",
        incorrect_answers: ["False"]
    },
    {
        question: "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".png",
        incorrect_answers: [".jpeg", ".gif", ".svg"]
    },
    {
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"]
    },
    {
        question: "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"]
    },
    {
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"]
    },
    {
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"]
    },
    {
        question: "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"]
    }
];

let currentQuestionIndex = 0;
let timer = 60; /* Durata del timer in secondi */
let elapsed = 0; /* Tempo trascorso in millisecondi */
let timerInterval;
let progressInterval;

const timeElement = document.getElementById('time');
const progressElement = document.getElementById('progress');
const questionContainers = document.querySelectorAll(".h3Answer");
const answerContainers = document.querySelectorAll(".conteinerAnswer");

function displayQuestion() {
    /* Nascondi tutte le domande */
    questionContainers.forEach(question => question.classList.add('hidden'));
    answerContainers.forEach(container => container.classList.add('hidden'));

    /* Mostra la domanda corrente */
    questionContainers[currentQuestionIndex].classList.remove('hidden');
    answerContainers[currentQuestionIndex].classList.remove('hidden');

    const currentQuestion = questions[currentQuestionIndex];
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];

    /* Mescola le risposte */
    allAnswers.sort(() => Math.random() - 0.5);

    /* Visualizza le risposte */
    answerContainers[currentQuestionIndex].innerHTML = '';
    for (let i = 0; i < allAnswers.length; i++) {
        const button = document.createElement('input');
        button.type = "button";
        button.value = allAnswers[i];
        button.classList.add('inputButton');
        button.onclick = () => checkAnswer(allAnswers[i], currentQuestion.correct_answer);
        answerContainers[currentQuestionIndex].appendChild(button);
    }

    /* Riporta il timer a 60 secondi per ogni domanda */
    resetTimer();
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong!");
    }

    /* Passa alla prossima domanda */
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert("Quiz completato!");
        clearInterval(progressInterval);
        clearInterval(timerInterval);
    }
}

function updateTimer() {
    if (elapsed < 60000) {
        elapsed += 50;
        const progressPercentage = (elapsed / 60000) * 360;
        progressElement.style.background = "conic-gradient(rgba(169, 169, 169, 0.3) " + progressPercentage + "deg, #00FFFF 0deg)";
        if (elapsed % 1000 === 0) {
            timer--;
            timeElement.textContent = timer;
        }
    } else {
        clearInterval(progressInterval);
        clearInterval(timerInterval);
        alert("Tempo scaduto!");
    }
}

function resetTimer() {
    /* Resetta i valori del timer e della barra */
    timer = 60;
    elapsed = 0;
    timeElement.textContent = timer;
    progressElement.style.background = `conic-gradient(cyan 0deg, rgba(169, 169, 169, 0.3) 0deg)`;

    /* Avvia gli intervalli per aggiornare barra e timer */
    clearInterval(progressInterval);
    clearInterval(timerInterval);
    progressInterval = setInterval(updateTimer, 50);
}

function startQuiz() {
    resetTimer(); 
    displayQuestion();
}

window.onload = startQuiz;

   