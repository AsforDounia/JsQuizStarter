import { updateQuestionTimerStyles  } from "./uiHelper.js";

let globalTimerRef = null;
let timer = 0;

export const startGlobalTimer = (startvalue = 0) => {
    timer = startvalue;
    if (globalTimerRef) return; // Prevent multiple intervals

    globalTimerRef = setInterval(() => {
        timer++;
        const timerElement = document.getElementById('timer');
        if (timerElement) timerElement.textContent = timer;
    }, 1000);
};

export const clearGlobalTimer = () => {
    clearInterval(globalTimerRef);
    globalTimerRef = null;
};

// ------------------ Question Timer ------------------
let questionTimerRef = null;
let currentQuestionTime = 0; // store current value

export const startQuestionTimer = (seconds, onTimeout = () => {}) => {
    if (questionTimerRef) return;

    if (typeof seconds === "number") currentQuestionTime = seconds;

    const timerElement = document.getElementById("question-timer-value");
    if (timerElement) timerElement.textContent = currentQuestionTime;

    updateQuestionTimerStyles(currentQuestionTime);
    questionTimerRef = setInterval(() => {
        if (currentQuestionTime > 0) {
            currentQuestionTime--;
            if (timerElement) timerElement.textContent = currentQuestionTime;
        }

        if(currentQuestionTime <= 5){
            updateQuestionTimerStyles(currentQuestionTime);
        }
        if (currentQuestionTime <= 0) {
            clearQuestionTimer(); // stop timer
            onTimeout();
        }

        
    }, 1000);
};

// Clear interval properly
export const stopQuestionTimer = () => {
    if (questionTimerRef) {
        clearInterval(questionTimerRef);
        questionTimerRef = null;
    }
    console.log("Stopped at :", currentQuestionTime);
};

// Helper: Reset timer completely
export const clearQuestionTimer = () => {
    if (questionTimerRef) {
        clearInterval(questionTimerRef);
        questionTimerRef = null;
    }
    currentQuestionTime = 0;
    const timerElement = document.getElementById("question-timer-value");
    if (timerElement) timerElement.textContent = currentQuestionTime;
};
