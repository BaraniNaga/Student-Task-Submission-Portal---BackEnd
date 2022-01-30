const Task = require('../models/model')



createTask = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No Data',
        })
    }

    const task = new Task(body)

    if (!task) {
        return res.status(400).json({ success: false, error: err })
    }

    task
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: task._id,
                message: 'Task created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'task not created!',
            })
        })
}

updateTask = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    task.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Task not found!',
            })
        }
        task.name = body.name
        task.email = body.email
        task.frontend = body.frontend
        task.backend = body.backend
        task.batch = body.batch
        task
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: task._id,
                    message: 'Task updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Task not updated!',
                })
            })
    })
}

deleteTask = async (req, res) => {
    await task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `task not found` })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getTaskById = async (req, res) => {
    await task.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `Task not found` })
        }
        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getTasks = async (req, res) => {
    await task.find({}, (err, Tasks) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tasks.length) {
            return res
                .status(404)
                .json({ success: false, error: `Task not found` })
        }
        return res.status(200).json({ success: true, data: Tasks })
    }).catch(err => console.log(err))
}

module.exports = {
    createTask,
    updatTask,
    deleteTask,
    getTasks,
    getTaskById,
}