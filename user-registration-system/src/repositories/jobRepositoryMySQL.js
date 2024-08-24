const mysql = require('mysql2/promise');
const JobRepository = require('./jobRepository');

class JobRepositoryMySQL extends JobRepository {
    constructor() {
        super();
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    async createJob(startAt, endAt, pattern, target, method) {
        try {
            const [result] = await this.connection.execute(
                `INSERT INTO jobs (startAt, endAt, pattern, target, method) VALUES (?, ?, ?, ?, ?)`,
                [new Date(startAt), endAt ? new Date(endAt) : null, pattern, target, method.toUpperCase()]
            );
            return JSON.stringify(result);
        }
        catch(error) {
            throw new Error(`database Error: ${error.message}`);
        }
    }

    async removeJob(jobId) {
        try {
            const [result] = await this.connection.execute(
                `DELETE FROM jobs WHERE id = ?`,
                [jobId]
            );

            // if (result.affectedRows === 0) {
            //     return res.status(404).json({ message: 'Job not found' });
            // } // because RESTFUL principles

            return {'message': 'job deleted successfully'};
        } catch (error) {
            throw new Error(`database Error: ${error.message}`);
        }
    }

    async getAllJobs() {
        try {
            const [rows] = await this.connection.execute(`SELECT * FROM jobs`);
            return rows;
        } catch(error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

}

module.exports = new JobRepositoryMySQL;
