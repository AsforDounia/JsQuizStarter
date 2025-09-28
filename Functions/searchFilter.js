// searchFilter.js
// Standalone — no imports here

// Apply filters to quiz history
export function applyFilters(calculateStats, createCharts) {
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

    const usernameFilter = document.getElementById("filter-username").value.trim().toLowerCase();
    const themeFilter = document.getElementById("filter-theme").value;
    const startDate = document.getElementById("filter-start-date").value;
    const endDate = document.getElementById("filter-end-date").value;

    const filteredHistory = quizHistory.flatMap(user => {
        const userName = user.userName || user.username;
        if (user.attempts && Array.isArray(user.attempts)) {
            return user.attempts.map(a => ({ ...a, userName }));
        }
        return user.score !== undefined ? [{ ...user, userName }] : [];
    }).filter(attempt => {
        let matches = true;

        if (usernameFilter && !attempt.userName.toLowerCase().includes(usernameFilter)) {
            matches = false;
        }
        if (themeFilter && attempt.theme !== themeFilter) {
            matches = false;
        }

        if (startDate || endDate) {
            const attemptDate = parseDate(attempt.date);
            console.log("attemptDate:", attemptDate, "startDate:", startDate, "endDate:", endDate);

            if (startDate) {
                const start = new Date(startDate);
                if (attemptDate < start) matches = false;
            }

            if (endDate) {
                const end = new Date(endDate);
                // ✅ include the whole end date until 23:59:59
                end.setHours(23, 59, 59, 999);
                if (attemptDate > end) matches = false;
            }
        }

        return matches;
    });

    // Save filtered data temporarily (optional)
    localStorage.setItem("filteredHistory", JSON.stringify(filteredHistory));

    const stats = calculateStats(filteredHistory);
    updateDashboard(filteredHistory, stats, createCharts);
}

// Reset filters
export function resetFilters(calculateStats, createCharts) {
    document.getElementById("filter-username").value = "";
    document.getElementById("filter-theme").value = "";
    document.getElementById("filter-start-date").value = "";
    document.getElementById("filter-end-date").value = "";

    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const stats = calculateStats(quizHistory);
    updateDashboard(quizHistory, stats, createCharts);
}

// Update dashboard
function updateDashboard(history, stats, createCharts) {
    const tableBody = document.querySelector("#history-table tbody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    history.forEach(attempt => {
        const row = document.createElement("tr");
        const totalQs = attempt.totalQuestions || attempt.total || 10;
        const score = attempt.score || 0;
        const status = attempt.status || (score > 0 ? "completed" : "incomplete");

        row.innerHTML = `
            <td>${attempt.date || ""}</td>
            <td>${attempt.userName}</td>
            <td>${attempt.theme || "unknown"}</td>
            <td>${Math.round((score / totalQs) * 100)}%</td>
            <td>${attempt.timeTaken || 0}</td>
            <td>${status}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("total-users").textContent = stats.totalUsers;
    document.getElementById("total-quizzes").textContent = stats.totalQuizzes;
    document.getElementById("avg-score").textContent = `${stats.avgScore}%`;
    document.getElementById("highest-score").textContent = `${stats.highestScore}%`;
    document.getElementById("avg-time").textContent = `${stats.avgTime}s`;

    createCharts(stats);
}

// ✅ Improved Helper: Parse date with dd/mm/yyyy hh:mm:ss
function parseDate(dateString) {
    if (!dateString) return null;

    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);

    let hours = 0, minutes = 0, seconds = 0;
    if (timePart) {
        [hours, minutes, seconds] = timePart.split(":").map(Number);
    }

    return new Date(year, month - 1, day, hours, minutes, seconds);
}

// Init filters (wiring events)
export function initFilters(calculateStats, createCharts) {
    document.getElementById("apply-filters")
        .addEventListener("click", () => applyFilters(calculateStats, createCharts));
    document.getElementById("reset-filters")
        .addEventListener("click", () => resetFilters(calculateStats, createCharts));

    // Populate theme dropdown
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const themes = [...new Set(
        quizHistory.flatMap(user => 
            user.attempts ? user.attempts.map(a => a.theme) : [user.theme]
        ).filter(Boolean)
    )];

    const themeSelect = document.getElementById("filter-theme");
    themes.forEach(theme => {
        const option = document.createElement("option");
        option.value = theme;
        option.textContent = theme;
        themeSelect.appendChild(option);
    });
}
