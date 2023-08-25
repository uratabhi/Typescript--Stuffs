"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'successfully added', todo: newTodo, todos: todos });
});
router.delete('/delete/:id', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(item => item.id !== params.id);
    res.status(200).json({ message: 'deleted todo', todos: todos });
});
router.put('/edit/:id', (req, res, next) => {
    const params = req.params;
    const tid = params.id;
    const body = req.body;
    const todoindex = todos.findIndex(item => item.id === tid);
    if (todoindex >= 0) {
        todos[todoindex] = { id: todos[todoindex].id, text: body.text };
        return res.status(200).json({ message: 'updated' });
    }
    return res.status(404).json({ message: 'not found' });
});
exports.default = router;
