import express from 'express';
import Task from './tasksModel.js';

const router = express.Router();

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}

function validateTask(req, res, next) {
    const { name, description, done } = req.body;
    if (typeof name !== 'string' || typeof description !== 'string' || typeof done !== 'boolean') {
        return res.status(400).send('Invalid task format');
    }
    next();
}

router.get('/', async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

router.post('/', validateTask, async (req, res) => {
    const task = new Task({ ...req.body });
    await task.save();
    res.status(201).json(task);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found.');
    res.json(task);
});

router.put('/:id', validateTask, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).send('Task not found.');
    res.json(task);
});

router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send('Task not found.');
    res.status(202).send('Task deleted.');
});

router.use(errorHandler);

export default router;
