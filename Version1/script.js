const questions = [
    "Liebst du es, draußen zu sein?",
    "Magst du es, wenn es schneit?",
    "Bevorzugst du warme Temperaturen?",
    "Genießt du die Farben der Natur im Herbst?",
    "Magst du lange Sommerabende?",
    "Fühlst du dich wohl, wenn es regnet?",
    "Bevorzugst du blühende Blumen im Frühling?",
    "Freust du dich auf das Laub im Herbst?"
];

const results = {
    summer: 0,
    winter: 0,
    spring: 0,
    autumn: 0
};

let shuffledQuestions = [];
let currentQuestion = 0;

function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => 0.5 - Math.random());
}

function answerQuestion(answer) {
    if (currentQuestion < shuffledQuestions.length) {
        if (currentQuestion === 0) {
            results.summer += answer ? 1 : 0;
            results.spring += answer ? 1 : 0;
            results.autumn += !answer ? 1 : 0;
            results.winter += !answer ? 1 : 0;
        } else if (currentQuestion === 1) {
            results.winter += answer ? 1 : 0;
        } else if (currentQuestion === 2) {
            results.summer += answer ? 1 : 0;
            results.spring += answer ? 1 : 0;
        } else if (currentQuestion === 3) {
            results.autumn += answer ? 1 : 0;
        } else if (currentQuestion === 4) {
            results.summer += answer ? 1 : 0;
        } else if (currentQuestion === 5) {
            results.winter += answer ? 1 : 0;
        } else if (currentQuestion === 6) {
            results.spring += answer ? 1 : 0;
        } else if (currentQuestion === 7) {
            results.autumn += answer ? 1 : 0;
        }

        currentQuestion++;
        if (currentQuestion < shuffledQuestions.length) {
            askNextQuestion();
        } else {
            showResult();
        }
    }
}

function askNextQuestion() {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <p>${shuffledQuestions[currentQuestion]}</p>
        <button id="yes-button">Ja</button>
        <button id="no-button">Nein</button>
    `;
    document.body.appendChild(questionElement);

    document.getElementById('yes-button').addEventListener('click', () => {
        answerQuestion(true);
        document.body.removeChild(questionElement);
    });
    document.getElementById('no-button').addEventListener('click', () => {
        answerQuestion(false);
        document.body.removeChild(questionElement);
    });
}

function showResult() {
    const maxSeason = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
    const resultElement = document.getElementById('result');
    resultElement.textContent = maxSeason.charAt(0).toUpperCase() + maxSeason.slice(1);

    const icons = {
        summer: 'path/to/summer-icon.png',
        winter: 'path/to/winter-icon.png',
        spring: 'path/to/spring-icon.png',
        autumn: 'path/to/autumn-icon.png'
    };
    
    const seasonIcon = document.getElementById('season-icon');
    seasonIcon.src = icons[maxSeason];
    seasonIcon.style.display = 'block';

    document.getElementById('result-container').style.display = 'block';
    confetti();
}

// Starte das Spiel
shuffleQuestions();
askNextQuestion();
