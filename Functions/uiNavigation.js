export const showWelcome = () => {
	window.location.reload();
// 	document.getElementById('dashboard-container')?.classList.add('hidden');
// 	document.getElementById('quiz-container')?.classList.add('hidden');
// 	document.getElementById('results-container')?.classList.add('hidden');
// 	document.getElementById('history-container')?.classList.add('hidden');
// 	document.getElementById('welcome-container')?.classList.remove('hidden');

// 	document.getElementById("username-input").value = "";

// const themeRadios = document.querySelectorAll('input[name="theme"]');

// themeRadios.forEach(radio => {
//   radio.addEventListener('click', function() {
//     // If the radio was already checked, uncheck it
//     if (this.wasChecked) {
//       this.checked = false;
//     }
//     // Store current checked state
//     themeRadios.forEach(r => r.wasChecked = r.checked);
//   });
// });


};

export const showQuizContainer = () => {
	document.getElementById('welcome-container').classList.add('hidden');
	document.getElementById('quiz-container').classList.remove('hidden');
}

export const showDashboard = () => {
	document.getElementById('welcome-container')?.classList.add('hidden');
	document.getElementById('dashboard-container')?.classList.remove('hidden');
};

export const backToThemeList = () => {
	document.getElementById('results-container')?.classList.add('hidden');
	document.getElementById('history-container')?.classList.remove('hidden');
	document.getElementById('history-list-container')?.classList.remove('hidden');
};


