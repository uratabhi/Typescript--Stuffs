import {Router} from 'express';

import {Todo} from '../models/todo';

let todos : Todo[] = [];
const router = Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({todos:todos});
})

router.post('/todo', (req, res, next)=>{
     const newTodo : Todo = {
        id : new Date().toISOString(),
        text: req.body.text
     };
     todos.push(newTodo);
     res.status(201).json({message : 'successfully added', todo : newTodo, todos : todos});
})

router.delete('/delete/:id', (req, res, next)=>{
     todos = todos.filter(item=>item.id!==req.params.id);
     res.status(200).json({message:'deleted todo', todos : todos});
})

router.put('/edit/:id', (req, res, next)=>{
    const tid = req.params.id;
    const todoindex=todos.findIndex(item=>item.id===tid);
    if(todoindex>=0){
        todos[todoindex]={id: todos[todoindex].id,text:req.body.text};
    return res.status(200).json({message:'updated'})

    }
    return res.status(404).json({message:'not found'});
})

export default router;