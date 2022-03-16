const Task = require("../models/tasks");
const _ = require("lodash");

const create = async(req, res) => {
    console.log(req.body);
    const task = await new Task(
        _.pick(req.body, ["task_name", "task_time", "task_compeleted"])
    );
    try {
        await task.save();
        return res
            .status(201)
            .send(_.pick(task, ["task_name", "task_time", "task_compeleted"]));
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

const list = async(req, res) => {
    //* we use it only we want to show single task.
    // const _id = req.params.id;
    // { _id }

    try {
        const task = await Task.find();
        if (!task) return res.status(400).json({ msg: "Task not found" });

        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: "Task could not found", error });
    }
};

const update = async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["task_name", "task_time", "task_compeleted"];
    const isValidUpdate = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    const _id = req.params.id;

    if (!isValidUpdate)
        return res.status(400).send({ Error: "Invalid updates.!" });

    try {
        const task = await Task.findOne({ _id });
        if (!task) return res.status(400).send("Oops Not founded !!");

        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        res
            .status(200)
            .send(_.pick(task, ["task_name", "task_time", "task_compeleted"]));
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

const del = async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndRemove({ _id });
        if (!task) return res.status(200).json({ message: "Task not found" });

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(400).json(err.message);
    }
};

module.exports = {
    create,
    list,
    update,
    del,
};