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


export const reviewAnswers = (quizState) => {

    const existingReview = document.querySelector('.review-container');
    if (existingReview) {
        existingReview.remove();
    }

    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'review-container';
    reviewContainer.style.position = 'relative';

    console.log("userAnswers", quizState.userAnswers);
    console.log("userName : ", quizState.username);
    reviewContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <button id="pdf-btn" class="pdf-download">Download PDF</button>
        <button id="close-btn" class="close-model" onclick="returnToWelcome()">X</button>
    </div>
    
        <h2 id="hello-title" style="text-align: center; color: white; margin-bottom: 2rem; font-size: 2rem; font-weight: 600;">
            📊 Hello <span style="background: linear-gradient(135deg,  #6366f1 0%, #06b6d4 50%, #f59e0b 100%);
    -webkit-text-fill-color: transparent; 
    -webkit-background-clip: text; ">${quizState.username}</span> Review Your Answers
        </h2>
        <h1 id="pdf-score" class="score quiz-title">Your Score: <span id="final-score">${quizState.score}</span></h1>
        <h2 class="quiz-subtitle">Theme : ${quizState.selectedTheme}</h2>
            <h3 class="time-result"> Time taken: <span id="final-time">${quizState.timer}</span> seconds</h3>
    `;

    Object.assign(reviewContainer.style, {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#1e293b",
        minHeight: '100vh',
        padding: '2rem',
        margin: '0'
    });

    quizState.userAnswers.forEach((item, index) => {
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
