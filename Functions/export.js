export const generatePDF = (userName) => {
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
// export.js

// Clean headers (without icons)
const cleanHeaders = ["Date", "Username", "Theme", "Score", "Time (s)", "Status"];

// Export table as CSV for Excel
function exportTableToCSV() {
    const table = document.querySelector("#history-table");
    if (!table) return;

    let csvContent = "";

    // Add headers
    csvContent += cleanHeaders.join(";") + "\n";

    // Add table body rows
    Array.from(table.querySelectorAll("tbody tr")).forEach(row => {
        const cells = Array.from(row.querySelectorAll("td"));
        const rowData = cells.map(td => td.innerText.replace(/;/g, ",").trim()); // replace ; inside cell
        csvContent += rowData.join(";") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    downloadFile(blob, "quiz_history.csv");
}

// Export table as JSON
function exportTableToJSON() {
    const table = document.querySelector("#history-table");
    if (!table) return;

    const rows = Array.from(table.querySelectorAll("tbody tr"));

    const data = rows.map(row => {
        const cells = Array.from(row.querySelectorAll("td"));
        const rowData = {};
        cleanHeaders.forEach((header, i) => {
            rowData[header] = cells[i]?.innerText || "";
        });
        return rowData;
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    downloadFile(blob, "quiz_history.json");
}

// Export table as PDF (requires jsPDF + autoTable)
// async function exportTableToPDF() {
//     const table = document.querySelector("#history-table");
//     if (!table) return;

//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     const rows = Array.from(table.querySelectorAll("tbody tr")).map(tr =>
//         Array.from(tr.querySelectorAll("td")).map(td => td.innerText)
//     );

//     doc.autoTable({
//         head: [cleanHeaders],
//         body: rows,
//     });

//     doc.save("quiz_history.pdf");
// }
// Export table as PDF using html2pdf
function exportTableToPDF() {
    const table = document.querySelector("#history-table");
    if (!table) return;

    // Clone the table
    const tableClone = table.cloneNode(true);
    tableClone.style.background = "white";
    tableClone.style.color = "black";
    tableClone.style.width = "100%";
    tableClone.style.borderCollapse = "collapse";

    // Force headers to have white background and black text
    Array.from(tableClone.querySelectorAll("th")).forEach(th => {
        th.style.cssText = "background-color: white !important; color: black !important; border: 1px solid black;";
    });

    // Optional: add borders to td cells for clarity
    Array.from(tableClone.querySelectorAll("td")).forEach(td => {
        td.style.cssText = "border: 1px solid black; color: black;";
    });

    const options = {
        margin:       0.5,
        filename:     "quiz_history.pdf",
        image:        { type: "jpeg", quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf()
        .set(options)
        .from(tableClone)
        .save();
}



// Helper to trigger downloads
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize export buttons
export function initExportButtons() {
    document.getElementById("export-json")?.addEventListener("click", exportTableToJSON);
    document.getElementById("export-csv")?.addEventListener("click", exportTableToCSV);
    document.getElementById("export-pdf")?.addEventListener("click", exportTableToPDF);
}
