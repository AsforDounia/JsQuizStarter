// Chart Variables
let themeChart = null;
let progressChart = null;

// Main function to create both charts
export const createCharts = (stats) => {
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    if (!stats || !quizHistory || quizHistory.length === 0) return;
    createThemeChart(stats);
    createProgressChart(quizHistory);
}

// Theme Performance Chart
function createThemeChart(stats) {
    const canvas = document.getElementById('theme-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (themeChart) themeChart.destroy();

    const themeData = stats.themeStats || {};
    const themes = Object.keys(themeData);
    if (themes.length === 0) return;

    const scores = themes.map(theme => themeData[theme].avgScore || 0);

    themeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: themes,
            datasets: [{
                label: 'Average Score (%)',
                data: scores,
                backgroundColor: [
                    'rgba(6, 182, 212, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    'rgba(6, 182, 212, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(139, 92, 246, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const theme = themes[context.dataIndex];
                            const t = themeData[theme];
                            return [
                                `Theme Name : ${theme} `,
                                `Average Score: ${context.parsed}%`,
                                `Quiz Count: ${t.count}`,
                                `Avg Time: ${t.avgTime}s`
                            ];
                        }
                    }
                }
            }
        }
    });
}

// Progress Over Time Chart
function createProgressChart(quizHistory) {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (progressChart) progressChart.destroy();

    const progressData = getProgressData(quizHistory);
    if (!progressData || progressData.dates.length === 0) return;

    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: progressData.dates,
            datasets: [
                {
                    label: 'Daily Quiz Count',
                    data: progressData.counts,
                    borderColor: 'rgba(6, 182, 212, 1)',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Average Score',
                    data: progressData.avgScores,
                    borderColor: 'rgba(16, 185, 129, 1)',
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: '#fff' }, grid: { color: '#fff' } },
                y: {
                    type: 'linear',
                    position: 'left',
                    ticks: { color: '#fff', stepSize: 1 },
                    title: { display: true, text: 'Quiz Count', color :'white' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    min: 0,
                    max: 100,
                    grid: { drawOnChartArea: false },
                    ticks: { color: '#fff' },
                    title: { display: true, text: 'Average Score (%)' , color :'white'}
                }
            }
        }
    });
}

// Helper: Prepare progress data
function getProgressData(quizHistory) {
    const dailyData = {};

    quizHistory.forEach(user => {
        const attempts = Array.isArray(user.attempts) ? user.attempts : [user];
        attempts.forEach(attempt => {
            const date = formatDateForChart(attempt.date);
            if (!date) return;
            if (!dailyData[date]) dailyData[date] = { count: 0, totalScore: 0 };
            const score = Number(attempt.score || 0);
            const totalQs = Number(attempt.totalQuestions || attempt.total || 10);
            dailyData[date].count++;
            dailyData[date].totalScore += (score / totalQs) * 100;
        });
    });

    const sortedDates = Object.keys(dailyData).sort();
    const recentDates = sortedDates.slice(-14);

    const dates = recentDates.map(d => {
        const [year, month, day] = d.split('-');
        return `${day}/${month}`;
    });
    const counts = recentDates.map(d => dailyData[d].count);
    const avgScores = recentDates.map(d => Math.round(dailyData[d].totalScore / dailyData[d].count));

    return { dates, counts, avgScores };
}

function formatDateForChart(dateString) {
    if (!dateString) return null;
    const [day, month, year] = dateString.split(' ')[0].split('/');
    return (day && month && year) ? `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}` : null;
}

