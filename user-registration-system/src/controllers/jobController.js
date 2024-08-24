const JobRepositoryMySQL = require('../repositories/jobRepositoryMySQL');

class JobController {
    static async addJob(req, res) {
        const { startAt, endAt, pattern, target, method } = req.body;
        try {
            const result = JobRepositoryMySQL.createJob(startAt, endAt, pattern, target, method);
            res.json({message: `job added successfully`});
        } catch (error) {
            res.status(500).json({
                message: 'Error when creating job',
                'error': error.message
            });
        }
    }

    static async removeJob(req, res) {
        try {
            const { id } = req.params;
            const result = JobRepositoryMySQL.removeJob(id);
            res.json({message: 'removed successfully'});
        } catch (error) {
            res.status(500).json({
                message: 'Error when removing job',
                'error': error.message
            });
        }
    }

    static async getAllJobs(req, res) {
        try {
            const jobs = await JobRepositoryMySQL.getAllJobs();
            res.json({'data': jobs});
        } catch (error) {
            res.status(500).json({
                message: 'Error getting all jobs',
                'error': error.message
            });
        }
    }
}

module.exports = JobController;
