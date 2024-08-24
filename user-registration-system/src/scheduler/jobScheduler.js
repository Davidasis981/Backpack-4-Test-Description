class JobScheduler {
    constructor() {
        this.jobs = [];
    }

    addJob({ id, pattern, target, startAt, endAt }) {
        const job = { id, pattern, target, startAt, endAt };
        this.jobs.push(job);
        this.scheduleJob(job);
    }

    scheduleJob(job) {
        const now = new Date();
        if (now >= job.startAt && (!job.endAt || now <= job.endAt)) {
            setInterval(() => {
                if (new Date() >= job.startAt && (!job.endAt || new Date() <= job.endAt)) {
                    job.target();
                }
            }, job.pattern);
        }
    }

    removeJob(id) {
        this.jobs = this.jobs.filter(job => job.id !== id);
    }
}

module.exports = new JobScheduler();
