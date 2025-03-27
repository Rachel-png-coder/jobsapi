# jobsapi
# giving credit
giving credit to "RapidApi"
x-rapidapi-host: active-jobs-db.p.rapidapi.com
RapidAPILinks to an external site.:x-rapidapi-jobs
const API_BASE_URL = 'https://google-jobs-api.p.rapidapi.com/google-jobs/job-type?jobType=Full-time&include=Accounting&location=Berlin/

# Jobs API

## Overview
The **Jobs API** by Rachel Toronga is a web application that fetches and displays job listings using the `jobs-api14.p.rapidapi.com` API. It provides users with real-time job opportunities and features interactive search, sorting, and filtering options to enhance the job-seeking experience.

## Features
- Fetches job listings from an external API
- Allows users to search for jobs by keyword, location, and category
- Sorts job results by relevance, date, or company
- Responsive design for optimal experience on different devices

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Nginx (if applicable)
- **API:** google-jobs-api.p.rapidapi.com

## Installation & Setup
### Prerequisites
- Node.js and npm installed (if applicable)
- API key for `job-search-api2.p.rapidapi.com`
- A running web server (e.g., Nginx for deployment)

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://your_token@github.com/yourusername/jobs-api.git
   cd jobs-api
   ```
2. Set up environment variables (if using API keys):
   ```sh
   export RAPIDAPI_KEY=your_api_key
   ```
3. Open `index.html` in a browser or use a local server:
   ```sh
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Deployment
To deploy your application:
1. Upload files to a server (Web01 & Web02)
2. Configure Nginx (if applicable)
3. Set up a load balancer to distribute traffic

## API Usage
- Base URL: `https://google-jobs-api.p.rapidapi.com/google-jobs/job-type?jobType=Full-time&include=Accounting&location=Berlin`
- Example Request:
  ```sh
  fetch('https://google-jobs-api.p.rapidapi.com/google-jobs/job-type?jobType=Full-time&include=Accounting&location=Berlin', {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': 'your_api_key',
          'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
      }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  ```

## Contribution
Feel free to contribute by submitting issues or pull requests!

## License
This project is licensed under the MIT License.

