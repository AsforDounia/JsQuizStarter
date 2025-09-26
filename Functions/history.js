export const reviewHistory = () => {
	const historyContainer = document.getElementById('history-container');
	if (!historyContainer) return;
	historyContainer.classList.remove('hidden');
	document.getElementById('welcome-container')?.classList.add('hidden');
	document.getElementById('user-history')?.classList.remove('hidden');
	document.getElementById('history-list-container')?.classList.add('hidden');
};

export const loadUserHistory = (onSelectAttempt) => {
	const user = document.getElementById('history-username-input')?.value.trim();
	if (!user) {
		alert('Please enter your name to view history.');
		return;
	}
	const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
	const userEntry = history.find(u => u.userName === user);
	if (!userEntry) {
		alert('No history found for this user.');
		return;
	}
	const historyList = document.getElementById('history-list-container');
	const userInput = document.getElementById('user-history');
	if (!historyList || !userInput) return;
	historyList.classList.remove('hidden');
	userInput.classList.add('hidden');
	historyList.innerHTML = '';
	(userEntry.attempts || []).forEach((attempt) => {
		const li = document.createElement('li');
		li.textContent = `Theme: ${attempt.theme}, Score: ${attempt.score}/${attempt.totalQuestions}, Time: ${attempt.timeTaken}s, Date: ${attempt.date}`;
		li.classList.add('history-item');
		li.addEventListener('click', () => onSelectAttempt?.(attempt, user));
		historyList.appendChild(li);
	});
};


