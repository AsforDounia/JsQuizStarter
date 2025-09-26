export const updateQuestionTimerStyles = (secondsLeft) => {
	const container = document.getElementById('question-timer');
	const valueEl = document.getElementById('question-timer-value');
	if (!container || !valueEl) return;
	// valueEl.textContent = secondsLeft;
	const color = secondsLeft >= 5 ? 'rgb(36, 255, 36)' : 'red';
	container.style.border = `${color} 2px solid`;
	container.style.color = color;
};


export const renderQuestionToDOM = (question, questionIndex) => {
	const questionText = document.getElementById('question-text');
	const answersContainer = document.getElementById('answers-container');
	if (questionText) questionText.textContent = question.question;
	if (!answersContainer) return;
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
	const currentQuestionIndexElement = document.getElementById('question-number');
	if (currentQuestionIndexElement) currentQuestionIndexElement.textContent = questionIndex + 1;
};


export const updateContinueBtnVisibility = () => {
    if (!savedState || !continueBtn) return;

    const parsed = JSON.parse(savedState);

    const usernameInput = document.getElementById("username-input");
    const currentUsername = usernameInput ? usernameInput.value.trim() : "";
    const currentTheme = getSelectedTheme();

    if (currentUsername === parsed.quizState.username &&
        currentTheme === parsed.quizState.selectedTheme) {
        if (continueBtn.classList.contains("hidden")) {
            continueBtn.classList.remove("hidden");
        }
    } else {
        if (!continueBtn.classList.contains("hidden")) {
            continueBtn.classList.add("hidden");
        }
    }
}
