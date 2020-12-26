//Aqui van nuestras rutitas basicamente, aqui va el trabajo del server
const express = require('express');

const router = express.Router();

const Task = require('../models/Task');

router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async(req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({
        status: 'Tarea guardada'
    });
})

router.put('/:id', async(req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Tarea actualizada'
    });
})

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Tarea eliminada'
    });
})

module.exports = router;