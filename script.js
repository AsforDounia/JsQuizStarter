const questionsByTheme = {
	"js-basics": [
		{
			id: 1,
			question: "Which JavaScript method selects an element by its ID?",
			answers: [
				"document.querySelector()",
				"document.getElementById()",
				"document.getElement()",
				"document.selectById()"
			],
			correct: [1]
		},
		{
			id: 2,
			question: "What does 'DOM' stand for?",
			answers: [
				"Document Object Model",
				"Data Object Management",
				"Dynamic Object Method",
				"Document Oriented Mapping"
			],
			correct: [0]
		},
		{
			id: 3,
			question: "How do you declare variables in ES6+?",
			answers: ["var myVar", "let myVar", "const myVar", "All of the above"],
			correct: [3]
		},
		{
			id: 4,
			question: "What is the difference between '==' and '==='?",
			answers: [
				"No difference",
				"=== checks type and value; == checks value only",
				"== checks type and value; === checks value only",
				"Both check type and value"
			],
			correct: [1]
		},
		{
			id: 5,
			question: "What does 'typeof null' return?",
			answers: ["'null'", "'undefined'", "'object'", "'boolean'"],
			correct: [2]
		},
		{
			id: 6,
			question: "How do you create an array?",
			answers: [
				"let arr = []",
				"let arr = new Array()",
				"let arr = Array()",
				"All of the above"
			],
			correct: [3]
		},
		{
			id: 7,
			question:
				"Which constructs can iterate over array elements? (Select all that apply)",
			answers: ["for loop", "forEach()", "map()", "for...of"],
			correct: [0, 1, 2, 3]
		},
		{
			id: 8,
			question: "How do you define a function?",
			answers: [
				"function myFunction() {}",
				"const myFunction = () => {}",
				"const myFunction = function() {}",
				"All of the above"
			],
			correct: [3]
		},
		{
			id: 9,
			question: "How do you access the first element of 'myArray'?",
			answers: ["myArray[1]", "myArray[0]", "myArray.first()", "myArray.get(0)"],
			correct: [1]
		},
		{
			id: 10,
			question: "What is the scope of a variable declared with 'let'?",
			answers: ["Global", "Function", "Block", "Module"],
			correct: [2]
		}
	],
	"es6": [
		{
			id: 1,
			question: "Which keyword creates a block-scoped variable?",
			answers: ["var", "let", "function", "class"],
			correct: [1]
		},
		{
			id: 2,
			question: "Const variables...",
			answers: [
				"Cannot be reassigned",
				"Cannot be mutated at all",
				"Are function-scoped",
				"Hoist with initialization"
			],
			correct: [0]
		},
		{
			id: 3,
			question: "Arrow functions differ from regular functions because...",
			answers: [
				"They bind their own 'this'",
				"They do not have their own 'this'",
				"They can be used as constructors",
				"They always return a value"
			],
			correct: [1]
		},
		{
			id: 4,
			question: "Which syntax creates a template literal?",
			answers: [
				"'single quotes'",
				'"double quotes"',
				"`backticks`",
				"(parentheses)"
			],
			correct: [2]
		},
		{
			id: 5,
			question: "What does array destructuring do?",
			answers: [
				"Merges arrays",
				"Copies arrays",
				"Unpacks values from arrays",
				"Sorts arrays"
			],
			correct: [2]
		},
		{
			id: 6,
			question: "What is the spread operator used for?",
			answers: [
				"To iterate arrays",
				"To expand iterables into places where multiple elements are expected",
				"To compare arrays",
				"To restrict object properties"
			],
			correct: [1]
		},
		{
			id: 7,
			question:
				"Which of the following convert array-like or iterable values to arrays? (Select all that apply)",
			answers: [
				"Array.from",
				"[...iterable] (spread)",
				"Array.prototype.slice.call(obj)",
				"Object.keys(obj)"
			],
			correct: [0, 1, 2]
		},
		{
			id: 8,
			question: "What does 'Promise.all' do?",
			answers: [
				"Resolves with the first fulfilled value",
				"Rejects with the last error",
				"Resolves when all promises resolve",
				"Runs promises sequentially"
			],
			correct: [2]
		},
		{
			id: 9,
			question: "Which statement imports a default export?",
			answers: [
				"import { something } from 'mod'",
				"import * as something from 'mod'",
				"import something from 'mod'",
				"require('mod')"
			],
			correct: [2]
		},
		{
			id: 10,
			question: "Which is NOT true about 'let' and 'const'?",
			answers: [
				"They are block scoped",
				"They are not attached to window in browsers",
				"They are function scoped",
				"They are not re-declarable in the same scope"
			],
			correct: [2]
		}
	],
	"dom-events": [
		{
			id: 1,
			question: "How do you add a click event listener?",
			answers: [
				"element.onClick(() => {})",
				"element.addEventListener('click', handler)",
				"element.add('click', handler)",
				"element.click(handler)"
			],
			correct: [1]
		},
		{
			id: 2,
			question: "What does 'event.preventDefault()' do?",
			answers: [
				"Stops all events",
				"Prevents default browser action",
				"Stops event propagation",
				"Removes listener"
			],
			correct: [1]
		},
		{
			id: 3,
			question: "Which property gives the target element of an event?",
			answers: ["event.node", "event.target", "event.source", "event.el"],
			correct: [1]
		},
		{
			id: 4,
			question:
				"Which methods can select multiple elements from the DOM? (Select all that apply)",
			answers: [
				"document.querySelectorAll",
				"document.getElementsByClassName",
				"document.getElementById",
				"document.getElementsByTagName"
			],
			correct: [0, 1, 3]
		},
		{
			id: 5,
			question: "How do you stop event bubbling?",
			answers: [
				"event.stop()",
				"event.stopPropagation()",
				"event.cancelBubble()",
				"event.preventDefault()"
			],
			correct: [1]
		},
		{
			id: 6,
			question: "Which API is best for manipulating classes?",
			answers: [
				"element.styles",
				"element.classList",
				"element.classes",
				"element.setClass"
			],
			correct: [1]
		},
		{
			id: 7,
			question: "How do you create a new DOM element?",
			answers: [
				"document.create()",
				"document.createElement()",
				"new Element()",
				"window.createElement()"
			],
			correct: [1]
		},
		{
			id: 8,
			question: "What does 'innerText' return?",
			answers: [
				"Raw HTML",
				"Rendered text considering CSS",
				"Text including hidden nodes",
				"Outer HTML"
			],
			correct: [1]
		},
		{
			id: 9,
			question: "Which property sets inline CSS styles?",
			answers: [
				"element.css",
				"element.style",
				"element.attributes.style",
				"element.inlineStyle"
			],
			correct: [1]
		},
        {
            id: 10,
            question: "How do you remove a DOM element?",
            answers: [
                "element.delete()",
                "element.remove()",
                "element.parentNode.removeChild(element)",
                "Both 2 and 3"
            ],
            correct: [3]
        }
	]
};



function shuffleArray(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy
}

let selectedTheme = null;
let currentQuestionIndex = 0;
let score = 0;
let timer = 0;
let timerInterval;
let shuffledQuestions = [];
let totalQuestions = 0;
let userAnswers = [];

const QUESTION_TIMEOUT_MS = 10000;
let questionTimeoutId = null;
let hasAnsweredCurrent = false;
let questionCountdownInterval = null;
let questionSecondsLeft = 10;

function updateQuestionTimerStyles() {
    const container = document.getElementById('question-timer');
    const valueEl = document.getElementById('question-timer-value');
    if (!container || !valueEl) return;

    valueEl.textContent = questionSecondsLeft;

    if (questionSecondsLeft >= 5) {
        container.style.border = 'rgb(36, 255, 36) 2px solid';
        container.style.color = 'rgb(36, 255, 36)';
    } else {
        container.style.border = 'red 2px solid';
        container.style.color = 'red';
    }
}

function clearQuestionTimeout() {
    if (questionTimeoutId) {
        clearTimeout(questionTimeoutId);
        questionTimeoutId = null;
    }
    if (questionCountdownInterval) {
        clearInterval(questionCountdownInterval);
        questionCountdownInterval = null;
    }
}


function autoAnswer() {
    if (hasAnsweredCurrent) return;
    hasAnsweredCurrent = true;
    clearQuestionTimeout();

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    const correctArray = Array.isArray(currentQuestion.correct)
        ? currentQuestion.correct.slice()
        : [currentQuestion.correct];

    userAnswers.push({
        question: currentQuestion.question,
        userAnswer: 'No answer',
        correctAnswer: correctArray.map(i => currentQuestion.answers[i]).join(', '),
        isCorrect: false
    });

    nextQuestion();
}



let quizHistory = [];
document.addEventListener('DOMContentLoaded', function() {

    const questionsStorage = localStorage.getItem('questionsByTheme') || [];
    if ( questionsStorage.length <= 0) {
        localStorage.setItem('questionsByTheme', JSON.stringify(questionsByTheme));
    }

    const totalElements = document.getElementById('total-questions');
    const timerElement = document.getElementById('timer');
    const currentQuestionIndexElement = document.getElementById('question-number');

    if (totalElements) totalElements.textContent = totalQuestions;
    if (timerElement) timerElement.textContent = timer;
    if (currentQuestionIndexElement) currentQuestionIndexElement.textContent = currentQuestionIndex + 1;

    quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    if (quizHistory.length > 0) {
        const historyButton = document.getElementById('history-button');

        if (historyButton) historyButton.classList.remove('hidden');

    }
});

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        timer++;
        const timerElement = document.getElementById('timer');
        if (timerElement) timerElement.textContent = timer;
    }, 1000);
}

function getSelectedTheme() {
    const themeRadios = document.getElementsByName('theme');
    for (let radio of themeRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}   
let data = [];
let userName = "";


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timer = 0;
    userAnswers = [];
    clearQuestionTimeout();

    userName = document.getElementById('username-input').value.trim();

    const themeSelected = getSelectedTheme();
    if (!userName || !themeSelected) {
        const msg = !userName ? "Please enter your name" : "Please select a theme";
        const alertContainer = document.getElementById('alert-container');
        const alertMsg = document.getElementById('alert-msg');
        if (alertMsg) alertMsg.textContent = msg + " to start the quiz.";
        if (alertContainer) {
            alertContainer.classList.remove('hidden');
            alertContainer.style.display = 'flex';
        }
        return;
    }

    selectedTheme = themeSelected;


    const timerElement = document.getElementById('timer');
    if (timerElement) timerElement.textContent = timer;

    const perQuestionEl = document.getElementById('question-timer-value');
    if (perQuestionEl) perQuestionEl.textContent = 10;

    updateQuestionTimerStyles();

    shuffledQuestions = shuffleArray(questionsByTheme[selectedTheme] || []);
    totalQuestions = shuffledQuestions.length;

    const totalElements = document.getElementById('total-questions');
    const currentQuestionIndexElement = document.getElementById('question-number');
    if (totalElements) totalElements.textContent = totalQuestions;
    if (currentQuestionIndexElement) currentQuestionIndexElement.textContent = currentQuestionIndex + 1;

    const finalUserEl = document.getElementById('final-username');
    if (finalUserEl) finalUserEl.textContent = userName;

    document.getElementById('welcome-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');

    renderQuestion();
    startTimer();

    const userHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const historyButton = document.getElementById("history-button");
    if (userHistory.length > 0 && historyButton) {
        historyButton.classList.remove("hidden");
    }
}


function submitAnswer() {
    const selectedInputs = Array.from(document.querySelectorAll('input[name="answer"]:checked'));

    if (selectedInputs.length === 0) {
        document.getElementById('alert-msg').textContent =
            "Please select at least one answer before submitting or click next question.";
        document.getElementById('alert-container').classList.remove('hidden');
        document.getElementById('alert-container').style.display = 'flex';
        return;
    }

    hasAnsweredCurrent = true;
    clearQuestionTimeout();

    const selectedIndices = selectedInputs.map(el => parseInt(el.value));
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    const correctArray = Array.isArray(currentQuestion.correct)
        ? currentQuestion.correct.slice()
        : [currentQuestion.correct];

    const isCorrect =
        JSON.stringify(selectedIndices.sort()) === JSON.stringify(correctArray.sort());

    userAnswers.push({
        question: currentQuestion.question,
        userAnswer: selectedIndices.map(i => currentQuestion.answers[i]).join(', '),
        correctAnswer: correctArray.map(i => currentQuestion.answers[i]).join(', '),
        isCorrect: isCorrect
    });

    if (isCorrect) score++;

    nextQuestion();
}


function nextQuestion() {
    if (!hasAnsweredCurrent && shuffledQuestions[currentQuestionIndex]) {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];

        const correctArray = Array.isArray(currentQuestion.correct)
            ? currentQuestion.correct.slice()
            : [currentQuestion.correct];

        userAnswers.push({
            question: currentQuestion.question,
            userAnswer: 'No answer',
            correctAnswer: correctArray.map(i => currentQuestion.answers[i]).join(', '),
            isCorrect: false
        });
    }

    clearQuestionTimeout();
    hasAnsweredCurrent = false;

    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        const currentQuestionIndexElement = document.getElementById('question-number');
        if (currentQuestionIndexElement) {
            currentQuestionIndexElement.textContent = currentQuestionIndex + 1;
        }
        renderQuestion();
    } else {
        endQuiz();
    }

    console.log("score : ", score);
}


function endQuiz() {
    clearQuestionTimeout();
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('results-container').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-time').textContent = timer;
    clearInterval(timerInterval);
    timerInterval = null;

    quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    console.log("userName : ", userName);
    console.log("quizHistory : ", quizHistory);
    let userEntry = quizHistory.find(u => u.userName === userName);

    const newAttempt = {
        date: new Date().toLocaleString(),
        theme: selectedTheme,
        score: score,
        totalQuestions: totalQuestions,
        timeTaken: timer,
        answers: [...userAnswers]
    };

    if (userEntry) {
        const themeIndex = userEntry.attempts.findIndex(a => a.theme === selectedTheme);
        if (themeIndex !== -1) {
            userEntry.attempts[themeIndex] = newAttempt;
        } else {
            userEntry.attempts.push(newAttempt);
        }
    } else {

        quizHistory.push({
            userName: userName,
            attempts: [newAttempt]
        });
    }

    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

function renderQuestion() {

    const question = shuffledQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    hasAnsweredCurrent = false;
    clearQuestionTimeout();
    
    if (questionText) questionText.textContent = question.question;
    if (answersContainer) {
        answersContainer.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            answerDiv.innerHTML = `
                <input type="checkbox" id="answer${index}" name="answer" value="${index}">
                <label for="answer${index}">${answer}</label>
            `;
            answersContainer.appendChild(answerDiv);
        });
    }

    questionSecondsLeft = 10;
    updateQuestionTimerStyles();

    questionCountdownInterval = setInterval(() => {
        if (questionSecondsLeft > 0) {
            questionSecondsLeft--;
            updateQuestionTimerStyles();
        }
    }, 1000);

    questionTimeoutId = setTimeout(autoAnswer, QUESTION_TIMEOUT_MS);
}

function closeAlert() {
    document.getElementById('alert-container').classList.add('hidden');
    document.getElementById('alert-container').style.display = 'none';
}

function restartQuiz() {
    clearQuestionTimeout();
    currentQuestionIndex = 0;
    score = 0;
    timer = 0;
    userAnswers = [];
    
    const timerElement = document.getElementById('timer');
    const currentQuestionIndexElement = document.getElementById('question-number');
    if (timerElement) timerElement.textContent = timer;
    const perQuestionEl = document.getElementById('question-timer-value');
    if (perQuestionEl) perQuestionEl.textContent = 10;
    updateQuestionTimerStyles();
    if (currentQuestionIndexElement) currentQuestionIndexElement.textContent = currentQuestionIndex + 1;
    
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    shuffledQuestions = shuffleArray(questionsByTheme[selectedTheme] || []);
    totalQuestions = shuffledQuestions.length;
    
    const totalElements = document.getElementById('total-questions');
    if (totalElements) totalElements.textContent = totalQuestions;
    
    renderQuestion();
    startTimer();
}

function returnToWelcome() {

    const resultsContainer = document.getElementById('results-container');


        if (resultsContainer) {
            resultsContainer.style.padding = '40px 24px';
        resultsContainer.innerHTML = `
            <div class="results" id="results">
                <h1 class="score quiz-title">Your Score: <span id="final-score"></span></h1>
                <h3 class="quiz-subtitle">Player: <span id="final-username"></span></h3>
                <h3 class="time-result"> Time taken: <span id="final-time"></span> seconds</h3>
                <button class="start-button" onclick="restartQuiz()">🔄 Restart the Quiz</button>
                <button class="start-button" onclick="returnToWelcome()">🏠 Return to Welcome Page</button>
                <button class="start-button" onclick="reviewAnswers()">📝 Review Answers</button>
            </div>
        `;

        resultsContainer.className = 'welcome-container hidden';
    }
    currentQuestionIndex = 0;
    score = 0;
    timer = 0;
    userAnswers = [];
    selectedTheme = null;
    clearInterval(timerInterval);
    timerInterval = null;
    clearQuestionTimeout();
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('welcome-container').classList.remove('hidden');
    const historyContainer = document.getElementById('history-container');

    if (historyContainer && !historyContainer.classList.contains('hidden')) {
        historyContainer.classList.add('hidden');
    }

    const usernameInput = document.getElementById('username-input');
    if (usernameInput) usernameInput.value = '';
    
    const themeRadios = document.getElementsByName('theme');
    themeRadios.forEach(radio => radio.checked = false);

}


function backToThemeList() {
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('history-container').classList.remove('hidden');

    document.getElementById('history-list-container').classList.remove('hidden');
}


function reviewAnswers() {

    const existingReview = document.querySelector('.review-container');
    if (existingReview) {
        existingReview.remove();
    }

    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'review-container';
    reviewContainer.style.position = 'relative';

    console.log("userAnswers", userAnswers);
    console.log("userName : ", userName);
    reviewContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <button id="pdf-btn" class="pdf-download" onclick="generatePDF()">Download PDF</button>
        <button id="close-btn" class="close-model" onclick="returnToWelcome()">X</button>
    </div>
    
        <h2 id="hello-title" style="text-align: center; color: white; margin-bottom: 2rem; font-size: 2rem; font-weight: 600;">
            📊 Hello <span style="background: linear-gradient(135deg,  #6366f1 0%, #06b6d4 50%, #f59e0b 100%);
    -webkit-text-fill-color: transparent; 
    -webkit-background-clip: text; ">${userName}</span> Review Your Answers
        </h2>
        <h1 id="pdf-score" class="score quiz-title">Your Score: <span id="final-score">${score}</span></h1>
        <h2 class="quiz-subtitle">Theme : ${selectedTheme}</h2>
            <h3 class="time-result"> Time taken: <span id="final-time">${timer}</span> seconds</h3>
    `;

    Object.assign(reviewContainer.style, {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#1e293b",
        minHeight: '100vh',
        padding: '2rem',
        margin: '0'
    });

    userAnswers.forEach((item, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'review-question';
        
        Object.assign(questionElement.style, {
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: `3px solid ${item.isCorrect ? '#10b981' : '#ef4444'}`,
            transition: 'transform 0.2s ease',
            maxWidth: '800px',
            margin: '0 auto 1.5rem auto'
        });

        questionElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="background: #6366f1; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600;">
                    Q${index + 1}
                </span>
                <span style="background: ${item.isCorrect ? '#10b981' : '#ef4444'}; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600;">
                    ${item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
            </div>
            
            <div style="color: #374151; font-size: 1.1rem; font-weight: 500; margin-bottom: 1.5rem;">
                ${item.question}
            </div>
            
           <div style="text-align: left;">
                <div style="font-weight: 600; color: #6b7280; margin-right: 1rem;">Your Answer:</div>
                <div style="background: ${item.isCorrect ? '#dcfce7' : '#fef2f2'}; color: ${item.isCorrect ? '#166534' : '#b91c1c'}; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 500;">
                    ${Array.isArray(item.userAnswer) ? item.userAnswer.join(', ') : item.userAnswer}
                </div>
            </div>
    ${!item.isCorrect ? `
        <div style="text-align: left;">
            <div style="font-weight: 600; color: #6b7280; margin-right: 1rem;">Correct Answer:</div>
            <div style="background: #dcfce7; color: #166534; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 500; white-space: nowrap;">
                ${Array.isArray(item.correctAnswer) ? item.correctAnswer.join(', ') : item.correctAnswer}
            </div>
        </div>
    ` : ''}

        `;

        questionElement.addEventListener('mouseenter', () => {
            questionElement.style.transform = 'translateY(-2px)';
            questionElement.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
        });
        
        questionElement.addEventListener('mouseleave', () => {
            questionElement.style.transform = 'translateY(0)';
            questionElement.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        });

        reviewContainer.appendChild(questionElement);
    });

    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.overflowY = 'auto';
        resultsContainer.style.maxHeight = '80vh';
        resultsContainer.style.padding = '0';
        resultsContainer.appendChild(reviewContainer);
    }
}



function reviewHistory() {
    const historyContainer = document.getElementById('history-container');
    historyContainer.classList.remove('hidden');
    document.getElementById('welcome-container').classList.add('hidden');
    document.getElementById('user-history').classList.remove('hidden');
    document.getElementById('history-list-container').classList.add('hidden');
}


function loadUserHistory() {
    const user = document.getElementById('history-username-input').value.trim();
    if (!user) {
        alert("Please enter your name to view history.");
        return;
    }
    
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const userEntry = history.find(u => u.userName === user);
   
    if (!userEntry) {
        alert("No history found for this user.");
        return;
    }
    userName = user;
    const historyList = document.getElementById('history-list-container');
    historyList.classList.remove('hidden');

    const userInput = document.getElementById('user-history');
    userInput.classList.add('hidden');

    historyList.innerHTML = '';

    console.log("userEntry : ", userEntry.attempts);
    userEntry.attempts.forEach((attempt, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Theme: ${attempt.theme}, Score: ${attempt.score}/${attempt.totalQuestions}, Time: ${attempt.timeTaken}s, Date: ${attempt.date}`;
        listItem.classList.add('history-item');
        
        
        listItem.addEventListener('click', () => {
    selectedTheme = attempt.theme;
    shuffledQuestions = shuffleArray(questionsByTheme[selectedTheme] || []);

    userAnswers = attempt.answers.map(ans => ({
        question: ans.question,
        userAnswer: ans.userAnswer,
        correctAnswer: ans.correctAnswer,
        isCorrect: ans.isCorrect
    }));

    score = attempt.score;
    totalQuestions = attempt.totalQuestions;
    timer = attempt.timeTaken;

    document.getElementById('history-container').classList.add('hidden');
    document.getElementById('results-container').classList.remove('hidden');
    reviewAnswers();
});
        historyList.appendChild(listItem);
    });
}


function generatePDF() {
    const reviewContainer = document.querySelector('.review-container');
    console.log("reviewContainer : ", reviewContainer);
    const pdfScore = document.querySelector('#pdf-score');
    const helloTitle = document.getElementById('hello-title');
    const closeBtn = document.getElementById('close-btn');
    const btn = document.getElementById('pdf-btn');



    if (!reviewContainer) {
        alert("No review to export.");
        return;
    }

    if (pdfScore) {
        pdfScore.style.background = 'white';
        pdfScore.style.webkitTextFillColor = 'black';
    }

    if (reviewContainer) reviewContainer.style.background = 'white';
    if (helloTitle) helloTitle.style.color = 'black';
    if (closeBtn) closeBtn.style.display = 'none';
    if (btn) btn.style.display = 'none';
    const options = {
        margin:       0.5,
        filename:     `${userName}_quiz_review.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },

        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

     html2pdf()
        .set(options)
        .from(reviewContainer)
        .save()
        .then(() => {
            if (btn) btn.style.display = "inline-block";
            if (closeBtn) closeBtn.style.display = "inline-block";
            if (pdfScore) {
                pdfScore.style.background = 'linear-gradient(135deg,  #6366f1 0%, #06b6d4 50%, #f59e0b 100%)';
                pdfScore.style.webkitBackgroundClip = 'text';
                pdfScore.style.webkitTextFillColor = 'transparent';
            }
            if (reviewContainer) reviewContainer.style.background = '#1e293b';
            if (helloTitle) helloTitle.style.color = 'white';
        });
    
}
