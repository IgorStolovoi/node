const getAllJobs = async (req, res) => {
    res.send('get all job')
}

const getJob = async (req, res) => {
    res.send('get job')
}

const createJob = async (req, res) => {
    res.send('create job')
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs, getJob, createJob, deleteJob
}