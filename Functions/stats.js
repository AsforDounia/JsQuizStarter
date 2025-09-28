export const calculateStats = (quizHistory) => {
    if (!quizHistory || quizHistory.length === 0) {
        return {
            totalUsers: 0,
            totalQuizzes: 0,
            avgScore: 0,
            highestScore: 0,
            avgTime: 0,
            totalTimeSpent: 0,
            completionRate: 0,
            averageQuestionsPerQuiz: 0,
            themeStats: {}
        };
    }

    // Flatten all attempts
    const allAttempts = quizHistory.flatMap(user => {
        const userName = user.userName || user.username || '';
        if (user.attempts && Array.isArray(user.attempts)) {
            return user.attempts.map(a => ({ ...a, userName }));
        }
        return user.score !== undefined ? [{ ...user, userName }] : [];
    });

    const totalUsers = new Set(allAttempts.map(a => a.userName.toLowerCase())).size;

    const stats = allAttempts.reduce((acc, attempt) => {
        const totalQs = attempt.totalQuestions || 10;
        const score = attempt.score || 0;
        const scorePercentage = (score / totalQs) * 100;
        const timeTaken = attempt.timeTaken || 0;
        const theme = attempt.theme || 'unknown';
        const isCompleted = attempt.status === 'completed';

        acc.totalQuizzes++;
        acc.totalScore += scorePercentage;
        acc.totalTime += timeTaken;
        acc.totalQuestions += totalQs;
        acc.highestScore = Math.max(acc.highestScore, scorePercentage);
        if (isCompleted) acc.completedQuizzes++;

        // Theme stats
        if (!acc.themeStats[theme]) acc.themeStats[theme] = { count: 0, totalScore: 0, totalTime: 0 };
        acc.themeStats[theme].count++;
        acc.themeStats[theme].totalScore += scorePercentage;
        acc.themeStats[theme].totalTime += timeTaken;

        return acc;
    }, {
        totalQuizzes: 0,
        totalScore: 0,
        totalTime: 0,
        totalQuestions: 0,
        highestScore: 0,
        completedQuizzes: 0,
        themeStats: {}
    });

    // Finalize theme stats
    Object.values(stats.themeStats).forEach(theme => {
        theme.avgScore = Math.round((theme.totalScore / theme.count) * 10) / 10;
        theme.avgTime = Math.round(theme.totalTime / theme.count);
    });

    const avgScore = stats.totalQuizzes ? stats.totalScore / stats.totalQuizzes : 0;
    const avgTime = stats.totalQuizzes ? stats.totalTime / stats.totalQuizzes : 0;
    const completionRate = stats.totalQuizzes ? (stats.completedQuizzes / stats.totalQuizzes) * 100 : 0;
    const averageQuestionsPerQuiz = stats.totalQuizzes ? stats.totalQuestions / stats.totalQuizzes : 0;

    return {
        totalUsers,
        totalQuizzes: stats.totalQuizzes,
        avgScore: Math.round(avgScore * 10) / 10,
        highestScore: Math.round(stats.highestScore * 10) / 10,
        avgTime: Math.round(avgTime),
        totalTimeSpent: stats.totalTime,
        completionRate: Math.round(completionRate * 10) / 10,
        averageQuestionsPerQuiz: Math.round(averageQuestionsPerQuiz * 10) / 10,
        themeStats: stats.themeStats
    };
};


// ✅ helper: parse date safely
function parseDate(dateString) {
    if (!dateString) return null;
    const parts = dateString.split(' ');
    const [day, month, year] = parts[0].split('/');
    if (day && month && year) return new Date(year, month - 1, day);
    return new Date(dateString);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

export const displayStatsOnDashboard = () => {
    try {
        const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
        const stats = calculateStats(quizHistory);

        // Update Stats Cards
        setText('total-users', stats.totalUsers);
        setText('total-quizzes', stats.totalQuizzes);
        setText('avg-score', `${stats.avgScore}%`);
        setText('highest-score', `${stats.highestScore}%`);
        setText('avg-time', `${stats.avgTime}s`);
        setText('completion-rate', `${stats.completionRate}%`);
        setText('average-questions', stats.averageQuestionsPerQuiz);

        // Populate Table
        const tableBody = document.querySelector('#history-table tbody');
        if (!tableBody) return;
        tableBody.innerHTML = '';

        quizHistory
            .flatMap(user => {
                const userName = user.userName || user.username;
                if (user.attempts && Array.isArray(user.attempts)) {
                    return user.attempts.map(attempt => ({ ...attempt, userName }));
                }
                return user.score !== undefined ? [{ ...user, userName }] : [];
            })
            // ✅ Sort newest first
            .sort((a, b) => (parseDate(b.date) || 0) - (parseDate(a.date) || 0))
            .forEach(attempt => {
                const row = document.createElement('tr');
                const totalQs = attempt.totalQuestions || attempt.total || 10;
                const score = attempt.score || 0;
                const status = attempt.status || (score > 0 ? 'completed' : 'incomplete');

                row.innerHTML = `
                    <td>${parseDate(attempt.date)?.toLocaleDateString('en-GB') || ''}</td>
                    <td>${attempt.userName}</td>
                    <td>${attempt.theme || 'unknown'}</td>
                    <td>${Math.round((score / totalQs) * 100)}%</td>
                    <td>${attempt.timeTaken || 0}</td>
                    <td>${status}</td>
                `;
                tableBody.appendChild(row);
            });

        // createCharts(stats,quizHistory);

        return stats;

    } catch (error) {
        console.error('Error displaying stats:', error);
    }
};
