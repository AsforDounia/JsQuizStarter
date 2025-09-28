import { loadData , shuffleArray ,getThemeNames } from "./Functions/loadData.js";
import { showQuizContainer, showWelcome , showDashboard } from "./Functions/uiNavigation.js";
import { renderQuestionToDOM } from "./Functions/uiHelper.js";
import { startGlobalTimer, clearQuestionTimer, stopQuestionTimer, startQuestionTimer } from "./Functions/timers.js";
import { reviewHistory, loadUserHistory , reviewAnswers } from "./Functions/history.js";
import { generatePDF } from "./Functions/export.js";
import { displayStatsOnDashboard } from "./Functions/stats.js";
import { createCharts } from "./Functions/chart.js";
import { calculateStats } from "./Functions/stats.js";
import { initFilters } from "./Functions/searchFilter.js";
import { initExportButtons } from "./Functions/export.js";

// --- Centralized quiz state ---
const quizState = {
    currentQuestionIndex: 0,
    score: 0,
    timer: 0,
    userAnswers: [],
    username: "",
    selectedTheme: "",
    shuffledQuestions: [],
    totalQuestions: 0,
	date : "",
};

// --- Question timer state ---
const questionState = {
    timeoutId: null,
    countdownInterval: null,
    secondsLeft: 10,
    hasAnswered: false,
    currentQuestions: [],
};

let hasAnsweredCurrent = false;

// --- Save quiz progress to quizHistory ---
function saveQuizProgress() {
    let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    let userEntry = quizHistory.find(u => u.userName === quizState.username);

	const timerElement = document.getElementById('timer');
	if (timerElement) quizState.timer = parseInt(document.getElementById('timer').textContent, 10) || 0;

    const currentAttempt = {
        date: quizState.date || new Date().toLocaleString(),
        theme: quizState.selectedTheme,
        score: quizState.score,
        totalQuestions: quizState.totalQuestions,
        timeTaken: quizState.timer,
        answers: [...quizState.userAnswers],
        status: "in-progress",

        currentQuestionIndex: quizState.currentQuestionIndex,
        shuffledQuestions: [...quizState.shuffledQuestions],
        questionState: {
            secondsLeft: questionState.secondsLeft,
            currentQuestions: questionState.currentQuestions
        },
        hasAnsweredCurrent
    };

    if (userEntry) {
        const themeIndex = userEntry.attempts.findIndex(a => 
            a.theme === quizState.selectedTheme && a.status === "in-progress"
        );
        if (themeIndex !== -1) {
            userEntry.attempts[themeIndex] = currentAttempt;
        } else {
            userEntry.attempts.push(currentAttempt);
        }
    } else {
        quizHistory.push({ userName: quizState.username, attempts: [currentAttempt] });
    }

    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

// --- Get in-progress quiz for user and theme ---
function getInProgressQuiz(username, theme) {
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const userEntry = quizHistory.find(u => u.userName === username);
    
    if (!userEntry) return null;
    
    return userEntry.attempts.find(a => 
        a.theme === theme && a.status === "in-progress"
    );
}

// --- DOM Ready ---
let themeNames ;
document.addEventListener("DOMContentLoaded", async () => {
    const themesData = {};
    const themeNames = await getThemeNames();
    for (let name of themeNames) {
        themesData[name] = await loadData(name);
    }
    if (!localStorage.getItem("questionsByTheme")) {
        localStorage.setItem("questionsByTheme", JSON.stringify(themesData));
    }

    // Inputs listeners
	checkStartBtnState();
    const usernameInput = document.getElementById("username-input");
    const themeRadios = document.getElementsByName("theme");
    if (usernameInput) usernameInput.addEventListener("input", checkStartBtnState);
    themeRadios.forEach(radio => radio.addEventListener("change", checkStartBtnState));
    
    const continueBtn = document.getElementById("continue-quiz-btn");
    if (continueBtn) continueBtn.addEventListener("click", continueQuiz);

    updateContinueBtnVisibility();
    usernameInput.addEventListener("input", updateContinueBtnVisibility);
    themeRadios.forEach(radio => radio.addEventListener("change", updateContinueBtnVisibility));



	// const filterSelect = document.getElementById('filter-theme');
	// themeNames.forEach((item)=>{
	// 	let option = document.createElement('option');
	// 	option.textContent = item;
	// 	option.value = item;
	// 	filterSelect.appendChild(option);
	// });
});

// --- Update continue button visibility ---
function updateContinueBtnVisibility() {
    const continueBtn = document.getElementById("continue-quiz-btn");
    const usernameInput = document.getElementById("username-input");

    if (!continueBtn || !usernameInput) return;

    const currentUsername = usernameInput.value.trim();
    const currentTheme = getSelectedTheme();

    if (currentUsername && currentTheme) {
        const inProgressQuiz = getInProgressQuiz(currentUsername, currentTheme);
        if (inProgressQuiz) {
            continueBtn.classList.remove("hidden");
        } else {
            continueBtn.classList.add("hidden");
        }
    } else {
        continueBtn.classList.add("hidden");
    }
}

// --- Continue Quiz ---
function continueQuiz() {
    const usernameInput = document.getElementById("username-input");
    const currentUsername = usernameInput.value.trim();
    const currentTheme = getSelectedTheme();
    
    const inProgressQuiz = getInProgressQuiz(currentUsername, currentTheme);
    if (!inProgressQuiz) return;

    // Restore quiz state
    Object.assign(quizState, {
        currentQuestionIndex: inProgressQuiz.currentQuestionIndex,
        score: inProgressQuiz.score,
        timer: inProgressQuiz.timeTaken,
        userAnswers: [...inProgressQuiz.answers],
        username: currentUsername,
        selectedTheme: currentTheme,
        shuffledQuestions: [...inProgressQuiz.shuffledQuestions],
        totalQuestions: inProgressQuiz.totalQuestions
    });

    Object.assign(questionState, inProgressQuiz.questionState);
    hasAnsweredCurrent = inProgressQuiz.hasAnsweredCurrent;

    showQuizContainer();
    document.getElementById("total-questions").textContent = quizState.totalQuestions;
    document.getElementById("question-number").textContent = quizState.currentQuestionIndex + 1;
    document.getElementById("final-username").textContent = quizState.username;

    renderQuestion();
    startGlobalTimer(quizState.timer);
}

// --- Start button ---
const startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", startQuiz);

function checkStartBtnState() {
    const userNameInput = document.getElementById("username-input");
    const themeSelected = getSelectedTheme();
    const userNameValue = userNameInput ? userNameInput.value.trim() : "";

    if (!userNameValue || !themeSelected) {
        startBtn.disabled = true;
        startBtn.title = !userNameValue ? "Please enter your name" : "Please select a theme";
        startBtn.style.cursor = "not-allowed";
        return;
    }
    startBtn.disabled = false;
    startBtn.title = "Start the Quiz";
    startBtn.style.cursor = "pointer";
}

function getSelectedTheme() {
    const themeRadios = document.getElementsByName("theme");
    for (let radio of themeRadios) if (radio.checked) return radio.value;
    return null;
}

async function startQuiz() {
    showQuizContainer();
    clearQuestionTimer();

    const userNameInput = document.getElementById("username-input");
    quizState.username = userNameInput ? userNameInput.value.trim() : "";
    quizState.selectedTheme = getSelectedTheme();
	quizState.date = new Date().toLocaleString();

    if (!quizState.username || !quizState.selectedTheme) {
        alert("Please enter username and select a theme");
        return;
    }

    // Reset quiz
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.userAnswers = [];

    // Load questions
    questionState.currentQuestions = await loadData(quizState.selectedTheme);
    quizState.shuffledQuestions = shuffleArray(questionState.currentQuestions);
    quizState.totalQuestions = quizState.shuffledQuestions.length;

    // document.getElementById("total-questions").textContent = quizState.totalQuestions;
    // document.getElementById("question-number").textContent = quizState.currentQuestionIndex + 1;
    // document.getElementById("final-username").textContent = quizState.username;

	const totalQuestions = document.getElementById("total-questions");
if (totalQuestions) totalQuestions.textContent = quizState.totalQuestions;

const questionNumber = document.getElementById("question-number");
if (questionNumber) questionNumber.textContent = quizState.currentQuestionIndex + 1;

const finalUsername = document.getElementById("final-username");
if (finalUsername) finalUsername.textContent = quizState.username;

	

    renderQuestion();
    startGlobalTimer();
}

// --- Render question ---
function renderQuestion() {
    const question = quizState.shuffledQuestions[quizState.currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");
    const submitBtn = document.getElementById("submit-button");

    questionState.hasAnswered = false;
    clearQuestionTimer();

    if (questionText) questionText.textContent = question.question;
    if (answersContainer) answersContainer.innerHTML = "";
    renderQuestionToDOM(question, quizState.currentQuestionIndex);

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";
        submitBtn.title = "Please select an answer before submitting";
        submitBtn.textContent = "Submit";
    }

    const inputs = answersContainer.querySelectorAll('input[name="answer"]');
    inputs.forEach(input => input.addEventListener('change', checkAnswerSelection));

    questionState.secondsLeft = 10;
    startQuestionTimer(10, () => autoAnswer());
}

// --- Auto answer ---
function autoAnswer() {
    if (hasAnsweredCurrent) return;
    hasAnsweredCurrent = true;
    clearQuestionTimer();

    const currentQuestion = quizState.shuffledQuestions[quizState.currentQuestionIndex];
    if (!currentQuestion) return;

    quizState.userAnswers.push({
        question: currentQuestion.question,
        userAnswer: 'No answer',
        correctAnswer: currentQuestion.correct,
        isCorrect: false
    });

    saveQuizProgress();
    nextQuestion();
}

// --- Next question ---
document.getElementById('next-button').addEventListener('click', nextQuestion);
function nextQuestion() {
    if (!hasAnsweredCurrent && quizState.shuffledQuestions[quizState.currentQuestionIndex]) {
        const currentQuestion = quizState.shuffledQuestions[quizState.currentQuestionIndex];
        const correctArray = Array.isArray(currentQuestion.correct) ? [...currentQuestion.correct] : [currentQuestion.correct];
        quizState.userAnswers.push({
            question: currentQuestion.question,
            userAnswer: 'No answer',
            correctAnswer: correctArray,
            isCorrect: false
        });
    }

    clearQuestionTimer();
    hasAnsweredCurrent = false;
    quizState.currentQuestionIndex++;

    if (quizState.currentQuestionIndex < quizState.shuffledQuestions.length) {
        document.getElementById('question-number').textContent = quizState.currentQuestionIndex + 1;
        renderQuestion();
    	saveQuizProgress();
    } else {
        endQuiz();
    }

}

// --- Check selection ---
const submitBtn = document.getElementById('submit-button');
function checkAnswerSelection() {
    if(submitBtn.textContent != "Valider"){
        const selectedInputs = document.querySelectorAll('input[name="answer"]:checked');
        submitBtn.disabled = selectedInputs.length === 0;
        submitBtn.style.cursor = selectedInputs.length === 0 ? "not-allowed" : "pointer";
    }
}

// --- Submit answer ---
submitBtn.addEventListener('click', submitAnswer);
function submitAnswer() {
    const quizContainer = document.getElementById('quiz-container');

    if(submitBtn.textContent != "Valider"){
        stopQuestionTimer();
        const currentQuestion = quizState.shuffledQuestions[quizState.currentQuestionIndex];
        if (!currentQuestion) return;

        submitBtn.disabled = false;
        submitBtn.textContent = "Valider";

        const selectedInputs = Array.from(document.querySelectorAll('input[name="answer"]:checked'));
        if (selectedInputs.length === 0) return;

        hasAnsweredCurrent = true;

        const correctValues = Array.isArray(currentQuestion.correct) ? currentQuestion.correct : [currentQuestion.correct];
        const selectedValues = selectedInputs.map(el => el.nextElementSibling.textContent.trim());

        const isCorrect = selectedValues.length === correctValues.length && selectedValues.every(val => correctValues.includes(val));

        document.querySelectorAll('.answer-option').forEach(div => {
            const label = div.querySelector('label') || div;
            const value = label.textContent.trim();
            div.classList.remove('correct', 'incorrect', 'disabled');
            if (correctValues.includes(value)) div.classList.add('correct');
            if (selectedValues.includes(value) && !correctValues.includes(value)) div.classList.add('incorrect');
            div.classList.add('disabled');
            const input = div.querySelector('input');
            if (input) input.disabled = true;
        });

        quizState.userAnswers.push({
            question: currentQuestion.question,
            userAnswer: selectedValues,
            correctAnswer: correctValues,
            isCorrect
        });

        if (isCorrect) quizState.score++;
        if (quizContainer) {
            quizContainer.classList.remove('correct', 'incorrect');
            quizContainer.classList.add(isCorrect ? 'correct' : 'incorrect');
        }

        saveQuizProgress();

    } else {
        if (quizContainer) quizContainer.classList.remove('correct', 'incorrect');
        nextQuestion();
        startQuestionTimer(10, () => autoAnswer());
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";
        submitBtn.style.title = "Please select at least one answer before submitting";
    }
}




function endQuiz() {
    quizState.timer = parseInt(document.getElementById('timer').textContent, 10) || 0;

    clearQuestionTimer();
    stopQuestionTimer();

    // document.getElementById('quiz-container').classList.add('hidden');
    // document.getElementById('results-container').classList.remove('hidden');

    // document.getElementById('final-username')?.textContent = quizState.username;
    // document.getElementById('final-score')?.textContent = quizState.score;
    // document.getElementById('final-time')?.textContent = quizState.timer;

	const quizContainer = document.getElementById('quiz-container');
if (quizContainer) quizContainer.classList.add('hidden');

const resultsContainer = document.getElementById('results-container');
if (resultsContainer) resultsContainer.classList.remove('hidden');

const finalUsername = document.getElementById('final-username');
if (finalUsername) finalUsername.textContent = quizState.username;

const finalScore = document.getElementById('final-score');
if (finalScore) finalScore.textContent = quizState.score;

const finalTime = document.getElementById('final-time');
if (finalTime) finalTime.textContent = quizState.timer;


    // Load quiz history
    let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    let userEntry = quizHistory.find(u => u.userName === quizState.username);

    const completedAttempt = {
        date: quizState.date || new Date().toLocaleString(),
        theme: quizState.selectedTheme,
        score: quizState.score,
        totalQuestions: quizState.totalQuestions,
        timeTaken: quizState.timer,
        answers: [...quizState.userAnswers],
        status: "completed"
    };

    if (userEntry) {
        // Check if an attempt for this theme already exists
        const existingIndex = userEntry.attempts.findIndex(a => a.theme === quizState.selectedTheme);

        if (existingIndex !== -1) {
            // Replace existing attempt
            userEntry.attempts[existingIndex] = completedAttempt;
        } else {
            // Add new attempt
            userEntry.attempts.push(completedAttempt);
        }
    } else {
        quizHistory.push({ userName: quizState.username, attempts: [completedAttempt] });
    }

    // Save updated history
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
console.log(quizState.userAnswers);

}



// --- Replay incorrect answers ---
document.getElementById('retry-incorrect-btn').addEventListener('click', replayIncorrectAnswers);
function replayIncorrectAnswers() {
    const incorrectAnswers = quizState.userAnswers.filter(ans => !ans.isCorrect);
    if (incorrectAnswers.length === 0) {
        alert("All answers are correct!");
        return;
    }

    const previousTime = quizState.timer || 0;

    quizState.shuffledQuestions = incorrectAnswers.map(ans =>
        questionState.currentQuestions.find(q => q.question === ans.question)
    ).filter(Boolean);

    quizState.totalQuestions = quizState.shuffledQuestions.length;
    quizState.currentQuestionIndex = 0;
    quizState.userAnswers = [];
    hasAnsweredCurrent = false;

    // document.getElementById("quiz-container").classList.remove("hidden");
    // document.getElementById("results-container").classList.add("hidden");
    // document.getElementById("question-number").textContent = 1;
    // document.getElementById("total-questions").textContent = quizState.totalQuestions;

	
	const quizContainer = document.getElementById("quiz-container");
	if (quizContainer) quizContainer.classList.remove("hidden");

	const resultsContainer = document.getElementById("results-container");
	if (resultsContainer) resultsContainer.classList.add("hidden");

	const questionNumber = document.getElementById("question-number");
	if (questionNumber) questionNumber.textContent = 1;

	const totalQuestions = document.getElementById("total-questions");
	if (totalQuestions) totalQuestions.textContent = quizState.totalQuestions;

    renderQuestion();
    startGlobalTimer(previousTime);
}

// document.getElementById("close-quiz").addEventListener("click",showWelcome);
// document.getElementById("dashboard-button").addEventListener("click",showDashboard);
// document.getElementById("restar-quiz").addEventListener("click",restartQuiz);
// document.getElementById("history-button").addEventListener("click",reviewHistory);
// document.getElementById("load-history").addEventListener("click",loadUserHistory);
// document.getElementById("review-your-answers").addEventListener("click", () => reviewAnswers(quizState));
// document.getElementById("pdf-btn").addEventListener("click",  () =>  generatePDF(quizState.username));

const closeQuiz = document.getElementById("close-quiz");
if (closeQuiz) closeQuiz.addEventListener("click", showWelcome);

const dashboardButton = document.getElementById("dashboard-button");
if (dashboardButton) dashboardButton.addEventListener("click", () => {
	showDashboard();
	const stats = displayStatsOnDashboard();
	createCharts(stats);
	// console.log(stats);
	
});

const restartQuizBtn = document.getElementById("restar-quiz");
if (restartQuizBtn) restartQuizBtn.addEventListener("click", restartQuiz);

const historyButton = document.getElementById("history-button");
if (historyButton) historyButton.addEventListener("click", reviewHistory);

const loadHistoryBtn = document.getElementById("load-history");
if (loadHistoryBtn) loadHistoryBtn.addEventListener("click",loadUserHistory);

// const reviewAnswersBtn = document.getElementById("review-your-answers");
// if (reviewAnswersBtn) reviewAnswersBtn.addEventListener("click", () => reviewAnswers(quizState));

// const pdfBtn = document.getElementById("pdf-btn");
// if (pdfBtn) pdfBtn.addEventListener("click", () => generatePDF(quizState.username));

const reviewAnswersBtn = document.getElementById("review-your-answers");
if (reviewAnswersBtn) {
    reviewAnswersBtn.addEventListener("click", () => {
        reviewAnswers(quizState); // call reviewAnswers first

        const pdfBtn = document.getElementById("pdf-btn");
        if (pdfBtn) pdfBtn.addEventListener("click", () => generatePDF(quizState.username));
    });
}


function restartQuiz() {
    // Reset question timer state
    clearQuestionTimer();
    questionState.secondsLeft = 10;
    questionState.hasAnswered = false;

    // Reset quiz state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.timer = 0;
    quizState.userAnswers = [];
    quizState.shuffledQuestions = shuffleArray(
        JSON.parse(localStorage.getItem("questionsByTheme"))?.[quizState.selectedTheme] || []
    );
    quizState.totalQuestions = quizState.shuffledQuestions.length;

    // Update DOM
    const timerElement = document.getElementById('timer');
    if (timerElement) timerElement.textContent = quizState.timer;

    const questionIndexEl = document.getElementById('question-number');
    if (questionIndexEl) questionIndexEl.textContent = quizState.currentQuestionIndex + 1;

    const perQuestionEl = document.getElementById('question-timer-value');
    if (perQuestionEl) perQuestionEl.textContent = questionState.secondsLeft;

    const totalEl = document.getElementById('total-questions');
    if (totalEl) totalEl.textContent = quizState.totalQuestions;

    // Show/hide containers
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');

    // Reset progress in localStorage (replace existing attempt if any)
    let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    let userEntry = quizHistory.find(u => u.userName === quizState.username);
    const newAttempt = {
        date: new Date().toLocaleString(),
        theme: quizState.selectedTheme,
        score: quizState.score,
        totalQuestions: quizState.totalQuestions,
        timeTaken: quizState.timer,
        answers: [],
        status: "in-progress",
        currentQuestionIndex: quizState.currentQuestionIndex,
        shuffledQuestions: [...quizState.shuffledQuestions],
        questionState: {
            secondsLeft: questionState.secondsLeft,
            currentQuestions: questionState.currentQuestions
        },
        hasAnsweredCurrent: false
    };

    if (userEntry) {
        const existingIndex = userEntry.attempts.findIndex(a => a.theme === quizState.selectedTheme);
        if (existingIndex !== -1) {
            // Replace existing attempt
            userEntry.attempts[existingIndex] = newAttempt;
        } else {
            userEntry.attempts.push(newAttempt);
        }
    } else {
        quizHistory.push({ userName: quizState.username, attempts: [newAttempt] });
    }
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

    // Render first question and start timer
    renderQuestion();
    startGlobalTimer();
}

document.querySelectorAll('.return-welcome').forEach(element => {
    element.addEventListener('click', showWelcome);
});





document.addEventListener("DOMContentLoaded", () => {
    initFilters(calculateStats, createCharts);
});


document.addEventListener("DOMContentLoaded", () => {
    initExportButtons();
});
