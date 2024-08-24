require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


const runJob = (job) => {
    const now = new Date();
    let response;
    if (now >= job.startAt && (!job.endAt || now <= job.endAt)) {
        setInterval(async () => {
            const currentTime = new Date();
            if (currentTime >= job.startAt && (!job.endAt || currentTime <= job.endAt)) {
                try {
                    const method = job.method.toUpperCase();
                    if (method === 'GET') {
                        response = await axios.get(job.target);
                    } else if (method === 'POST') {
                        response = await axios.post(job.target);
                    } else if (method === 'PUT') {
                        response = await axios.put(job.target);
                    } else if (method === 'DELETE') {
                        response = await axios.delete(job.target);
                    } else {
                        console.error(`Unsupported HTTP method: ${method}`);
                    }
                    console.log(`Job ID ${job.id} executed successfully.`);
                    console.log('\nresponse:\n', response.data);
                } catch (error) {
                    console.error(`Job ID ${job.id} failed:`, error.message);
                }
            }
        }, job.pattern);
    }
};



const loadJobs = async () => {
    try {
        const [jobs] = await pool.execute('SELECT * FROM jobs');
        console.log(`${jobs.length} job found!`);
        
        jobs.forEach(job => {
            job.startAt = new Date(job.startAt);
            job.endAt = job.endAt ? new Date(job.endAt) : null;
            runJob(job);
        });
    } catch (error) {
        console.error('Error loading jobs:', error.message);
    }
};

// setInterval(loadJobs, 60000); // Check every minute
loadJobs();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
