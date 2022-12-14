const Job = require("../models/Job")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.id }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs })
}

const getJob = async (req, res) => {
    res.send('get job')
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.id
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs, getJob, createJob, deleteJob
}