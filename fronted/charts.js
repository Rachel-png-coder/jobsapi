document.addEventListener("DOMContentLoaded", function () {
    fetch("https://google-jobs-api.p.rapidapi.com/google-jobs/job-type?jobType=Full-time&include=Accounting&location=Berlin")
        .then(response => response.json())
        .then(data => {
            processJobData(data);
        })
        .catch(error => console.error("Error loading job opportunities for chart:", error));
});

function processJobData(jobs) {
    const jobsByCategoryData = aggregateData(jobs, "category", "count");
    const jobsByCompanyData = aggregateData(jobs, "company", "count");
    const salaryTrendsData = aggregateSalaryData(jobs);

    window.charts.createJobsByCategoryChart(jobsByCategoryData);
    window.charts.createJobsByCompanyChart(jobsByCompanyData);
    window.charts.createSalaryTrendsChart(salaryTrendsData);
}

function aggregateData(jobs, key, metric) {
    const result = {};
    
    jobs.forEach(job => {
        const category = job[key] || "Unknown";
        if (!result[category]) {
            result[category] = { count: 0 };
        }
        result[category].count += 1;
    });

    return {
        labels: Object.keys(result),
        values: Object.values(result).map(item => item[metric])
    };
}

function aggregateSalaryData(jobs) {
    const result = {};

    jobs.forEach(job => {
        const date = new Date(job.posted_date);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        
        if (!result[month]) {
            result[month] = { totalSalary: 0, count: 0 };
        }
        result[month].totalSalary += parseFloat(job.salary);
        result[month].count += 1;
    });

    return {
        labels: Object.keys(result),
        salaries: Object.values(result).map(item => item.totalSalary / item.count)
    };
}

const chartColors = {
    background: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
    border: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)']
};

function createChart(id, type, labels, datasets) {
    const ctx = document.getElementById(id)?.getContext('2d');
    if (!ctx) return null;

    return new Chart(ctx, {
        type: type,
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

window.charts = {
    createJobsByCategoryChart: data => createChart("jobsByCategoryChart", "bar", data.labels, [{
        label: "Job Openings by Category",
        data: data.values,
        backgroundColor: chartColors.background,
        borderColor: chartColors.border,
        borderWidth: 1
    }]),
    
    createJobsByCompanyChart: data => createChart("jobsByCompanyChart", "bar", data.labels, [{
        label: "Job Openings by Company",
        data: data.values,
        backgroundColor: chartColors.background,
        borderColor: chartColors.border,
        borderWidth: 1
    }]),
    
    createSalaryTrendsChart: data => createChart("salaryTrendsChart", "line", data.labels, [{
        label: "Average Salary Trends",
        data: data.salaries,
        borderColor: chartColors.border[0],
        backgroundColor: chartColors.background[0],
        borderWidth: 1,
        fill: false
    }])
};
