const questions = [
    {
        question: "Which JavaScript method is used to select an HTML element by its ID?",
        answers: [
            "document.querySelector()",
            "document.getElementById()",
            "document.getElement()",
            "document.selectById()"
        ],
        correct: 1
    },
    {
        question: "What does 'DOM' stand for in JavaScript?",
        answers: [
            "Document Object Model",
            "Data Object Management",
            "Dynamic Object Method"
        ],
        correct: 0
    },
    {
        question: "How do you declare a variable in JavaScript (ES6+)?",
        answers: [
            "var myVariable",
            "let myVariable",
            "const myVariable",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "What is the difference between '==' and '===' in JavaScript?",
        answers: [
            "No difference",
            "=== checks both type and value, == checks only value",
            "== checks both type and value, === checks only value"
        ],
        correct: 1
    },
    {
        question: "How do you add an event listener to an element?",
        answers: [
            "element.onclick = function()",
            "element.addEventListener('click', function())",
            "element.addEvent('click', function())",
            "Both A and B are correct"
        ],
        correct: 3
    },
    {
        question: "What does 'typeof null' return in JavaScript?",
        answers: [
            "'null'",
            "'undefined'",
            "'object'",
            "'boolean'"
        ],
        correct: 2
    },
    {
        question: "How do you create an array in JavaScript?",
        answers: [
            "let arr = []",
            "let arr = new Array()",
            "let arr = Array()",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "Which method can be used to loop through all elements in an array?",
        answers: [
            "for loop",
            "forEach()",
            "map()",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "How do you define a function in JavaScript?",
        answers: [
            "function myFunction() {}",
            "const myFunction = () => {}",
            "const myFunction = function() {}",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "What does JSON.parse() do?",
        answers: [
            "Converts a JavaScript object into a JSON string",
            "Converts a JSON string into a JavaScript object",
            "Validates JSON format",
            "Formats a JSON object"
        ],
        correct: 1
    },
    {
        question: "How do you access the first element of an array named 'myArray'?",
        answers: [
            "myArray[1]",
            "myArray[0]",
            "myArray.first()",
            "myArray.get(0)"
        ],
        correct: 1
    },
    {
        question: "What is the scope of a variable declared with 'let'?",
        answers: [
            "Global",
            "Function",
            "Block",
            "Module"
        ],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 0;
let timerInterval;
const totalQuestions = questions.length;

const totalElements = document.getElementById('total-questions');
totalElements.textContent = totalQuestions;

const timerElement = document.getElementById('timer');
timerElement.textContent = timer;

const currentQuestionIndexElement = document.getElementById('question-number');
currentQuestionIndexElement.textContent = currentQuestionIndex + 1;

const questionText = document.getElementById('question-text');


const question = questions[currentQuestionIndex]
questionText.textContent = question.question;

const answersContainer = document.getElementById('answers-container');
answersContainer.innerHTML = '';
        
question.answers.forEach((answer, index) => {
    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer-option';
    answerDiv.innerHTML = `
        <input type="radio" id="answer${index}" name="answer" value="${index}">
        <label for="answer${index}">${answer}</label>
    `;
    answersContainer.appendChild(answerDiv);
});

// function

