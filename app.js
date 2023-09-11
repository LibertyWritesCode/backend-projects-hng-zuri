/*

Objective
Create and host an endpoint using any programming language of your choice.
The endpoint should take two GET request query parameters and return specific information in JSON format.Requirements
The information required includes:

// Slack name
// Current day of the week
// Current UTC time (with validation of +/-2)
// Track
// The GitHub URL of the file being run
// The GitHub URL of the full source code.
// A  Status Code of Success
// JSON

{
  "slack_name": "example_name",
  "current_day": "Monday",
  "utc_time": "2023-08-21T15:04:05Z",
  "track": "backend",
  "github_file_url": "https://github.com/username/repo/blob/main/file_name.ext",
  "github_repo_url": "https://github.com/username/repo",
  “status_code”: 200
}

*/

import express from "express";

const app = express();

app.get ('/', async(req, res) => {

    try {
        const { slack_name, track } = req.query;

        if (!slack_name || !track) {
            return res.status(400).json({ message: "All query parameters are required!"})
        }

        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const day = new Date();

        const current_day = weekday[day.getDay()];
        const utc_time = day.toISOString();
        const github_repo_url = `https://github.com/LibertyWritesCode/backend-projects-hng-zuri`
        const github_file_url = `https://github.com/LibertyWritesCode/backend-projects-hng-zuri/blob/main/app.ts`
        const status_code = "200"

        return res.status(200).send({ slack_name, current_day, utc_time, track, github_file_url, github_repo_url, status_code });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error'})
    }
});
 
app.listen(5000, async () => {
    console.log('Server is running on http://localhost:5000')
});