import express from 'express';
import tasks from './tasks.js';

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

router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', validateTask, (req, res) => {
    const task = { id: tasks.length + 1, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});

router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    res.json(task);
});

router.put('/:id', validateTask, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    Object.assign(task, req.body);
    res.json(task);
});

router.delete('/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found.');
    tasks.splice(taskIndex, 1);
    res.status(202).send('Task deleted.');
});

router.use(errorHandler);

export default router;
