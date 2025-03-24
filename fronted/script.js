const apiKey = '2441fb6619mshd2329fd64b8505cp163283jsnbfa60d52c50f'; // Replace with your API key from RapidAPI
const apiHost = 'jobs-api14.p.rapidapi.com'; // the correct host
const apiUrl = `https://jobs-api14.p.rapidapi.com/search`; // The API endpoint

// Handle search button click
document.getElementById('search-button').addEventListener('click', () => {
    const jobTitle = document.getElementById('job-title').value;
    const location = document.getElementById('location').value;

    if (jobTitle && location) {
        fetchJobs(jobTitle, location);
    } else {
        alert('Please enter both job title and location!');
    }
});

// Function to fetch jobs based on title and location
function fetchJobs(jobTitle, location) {
    fetch(`${apiUrl}?query=${jobTitle}&location=${location}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': "2441fb6619mshd2329fd64b8505cp163283jsnbfa60d52c50f",
            'X-RapidAPI-Host': jobs-api14.p.rapidapi.com,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch job listings');
        }
        return response.json();
    })
    .then(data => displayJobs(data))
    .catch(error => alert(error.message));
}

// Function to display job listings
function displayJobs(data) {
    const jobListContainer = document.getElementById('job-list-container');
    jobListContainer.innerHTML = ''; // Clear previous results

    if (!data.jobs || data.jobs.length === 0) {
        jobListContainer.innerHTML = '<p>No jobs found</p>';
        return;
    }

    data.jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} - ${job.location}</p>
            <p>${job.snippet}</p>
            <a href="${job.url}" target="_blank">Apply Now</a>
        `;
        jobListContainer.appendChild(jobCard);
    });
}
