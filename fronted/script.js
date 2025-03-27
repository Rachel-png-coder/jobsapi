let allJobs = [];

document.addEventListener("DOMContentLoaded", function () {
    const totalJobs = document.getElementById("total-jobs");
    const popularIndustry = document.getElementById("popular-industry");
    const newListings = document.getElementById("new-listings");

    const jobsTableElement = document.getElementById("recent-jobs-table");
    const jobsTable = jobsTableElement ? jobsTableElement.getElementsByTagName("tbody")[0] : null;

    const barChartElement = document.getElementById("industryBarChart");
    const pieChartElement = document.getElementById("jobPieChart");

    let barChart, pieChart;
    const barChartCtx = barChartElement ? barChartElement.getContext("2d") : null;
    const pieChartCtx = pieChartElement ? pieChartElement.getContext("2d") : null;

    async function fetchJobListings() {
        try {
            if (jobsTable) {
                jobsTable.innerHTML = '<tr><td colspan="6" class="loading">Loading job listings...</td></tr>';
            }

            const data = await window.api.fetchAllJobs(); // Fetch data from API
            allJobs = data;

            initDashboard();
        } catch (error) {
            console.error("Error fetching data:", error);
            if (jobsTable) {
                jobsTable.innerHTML = `<tr><td colspan="6" class="loading">Error loading data: ${error.message}</td></tr>`;
            }
        }
    }

    function initDashboard() {
        updateOverview(allJobs);
        renderTable(allJobs);
        renderCharts(allJobs);
    }

    function updateOverview(data) {
        if (!totalJobs || !popularIndustry || !newListings) return;

        totalJobs.textContent = data.length;
        newListings.textContent = data.filter(job => isNewListing(job.posted_date)).length;

        const industries = data.map(job => job.industry);
        const frequency = industries.reduce((acc, industry) => {
            acc[industry] = (acc[industry] || 0) + 1;
            return acc;
        }, {});

        let mostPopular = 'N/A';
        let maxCount = 0;

        for (const industry in frequency) {
            if (frequency[industry] > maxCount) {
                maxCount = frequency[industry];
                mostPopular = industry;
            }
        }

        popularIndustry.textContent = mostPopular;
    }

    function renderTable(data) {
        if (!jobsTable) return;

        jobsTable.innerHTML = "";

        if (data.length === 0) {
            jobsTable.innerHTML = '<tr><td colspan="6" class="loading">No job listings found</td></tr>';
            return;
        }

        data.forEach(job => {
            const row = jobsTable.insertRow();
            row.innerHTML = `
                <td>${job.id || 'N/A'}</td>
                <td>${job.title || 'Unknown'}</td>
                <td>${job.company || 'Unknown'}</td>
                <td>${job.location || 'N/A'}</td>
                <td>${formatDate(job.posted_date)}</td>
                <td class="job-details">${job.description || 'No details available'}</td>
            `;
        });
    }

    function isNewListing(dateStr) {
        if (!dateStr) return false;
        const postedDate = new Date(dateStr);
        const today = new Date();
        return (today - postedDate) / (1000 * 60 * 60 * 24) < 7; // Less than 7 days old
    }

    function formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function renderCharts(data) {
        if (!barChartCtx || !pieChartCtx) return;

        const industries = data.map(job => job.industry);
        const frequency = industries.reduce((acc, industry) => {
            acc[industry] = (acc[industry] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(frequency);
        const counts = Object.values(frequency);

        if (barChart) barChart.destroy();
        if (pieChart) pieChart.destroy();

        barChart = new Chart(barChartCtx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Job Listings Per Industry",
                    data: counts,
                    backgroundColor: "#4CAF50",
                    borderColor: "#388E3C",
                    borderWidth: 1
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Job Listings Per Industry' }
                },
                scales: { y: { beginAtZero: true } }
            }
        });

        pieChart = new Chart(pieChartCtx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    label: "Job Distribution",
                    data: counts,
                    backgroundColor: ["#4CAF50", "#66BB6A", "#81C784", "#A5D6A7"],
                    borderColor: "#fff",
                    borderWidth: 1
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' },
                    title: { display: true, text: 'Job Distribution by Industry' }
                }
            }
        });
    }

    fetchJobListings();
    fetch("https://job-search-api2.p.rapidapi.com/active-ats-7d", {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": "2441fb6619mshd2329fd64b8505cp163283jsnbfa60d52c50f",
            "X-RapidAPI-Host": "active-jobs-db.p.rapidapi.com"
        }
    })
});
then(response => {
    if (!response.ok) {
        throw new Error("Failed to fetch job listings.");
    }
    return response.json();  // Parses the JSON response
})
.then(data => {
    if (!data || !data.jobs) throw new Error("No job listings found.");

    data.jobs.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";
        jobCard.innerHTML = `
            <p class="job-title">${job.title}</p>
            <p class="job-location">${job.location}</p>
            <p class="job-date">Posted: ${formatDate(job.date)}</p>
            <a href="${job.url}" target="_blank">Apply Now</a>
        `;
        jobListContainer.appendChild(jobCard);
    });
})
