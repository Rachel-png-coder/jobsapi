import requests

url = "https://google-jobs-api.p.rapidapi.com/google-jobs/job-type?jobType=Full-time&include=Accounting&location=Berlin"
headers = {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "google-jobs-api.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

import os
API_HOST = os.getenv("API_HOST", "google-jobs-api.p.rapidapi.com")

if response.status_code == 200:
    content_type = response.headers.get('Content-Type', '').lower()

    if 'application/json' in content_type:
        # Handle JSON response
        try:
            data = response.json()
            print(data)
        except requests.exceptions.JSONDecodeError:
            print("Error decoding JSON. The response is not in valid JSON format.")
    else:
        # Handle non-JSON response
        print(f"Received non-JSON response. Content-Type: {content_type}")
        print(response.text)  # Print the raw response
else:
    print(f"Error: {response.status_code}")

