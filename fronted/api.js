// api.js - API calls for job opportunities
const API_BASE_URL = 'https://google-jobs-api.p.rapidapi.com/google-jobs/job-type?jobType=Full-time&include=Accounting&location=Berlin/';  // Adjust to your backend URL

let jobCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

// Fetch all job opportunities (cached for performance)
async function fetchAllJobs() {
    const now = new Date().getTime();
    if (jobCache && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
        return jobCache;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        jobCache = data;
        lastFetchTime = now;
        return data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
}

// Fetch paginated job listings with filters
async function fetchJobsPaginated(page = 1, pageSize = 20, filters = {}) {
    try {
        const queryParams = new URLSearchParams({
            page: page,
            pageSize: pageSize,
            ...filters
        });
        const response = await fetch(`${API_BASE_URL}/jobs/paginated?${queryParams}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching paginated jobs:", error);
        throw error;
    }
}

// Fetch job statistics
async function fetchJobStats(params = {}) {
    try {
        const queryParams = new URLSearchParams(params);
        const response = await fetch(`${jobs-api14.p.rapidapi.com}/jobs/stats?${queryParams}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching job stats:", error);
        throw error;
    }
}

// Fetch job trends
async function fetchJobTrends(params = {}) {
    try {
        const queryParams = new URLSearchParams(params);
        const response = await fetch(`${API_BASE_URL}/jobs/trends?${queryParams}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching job trends:", error);
        throw error;
    }
}

// Format salary amounts
function formatSalary(amount) {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// Expose functions globally for use in other scripts
window.api = {
    fetchAllJobs,
    fetchJobsPaginated,
    fetchJobStats,
    fetchJobTrends,
    formatSalary
};

