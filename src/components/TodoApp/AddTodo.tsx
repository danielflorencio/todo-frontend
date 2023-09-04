import { useState } from "react";
import { Todo } from "../../types/todo"
import { Box, Button, MenuItem, TextField } from "@mui/material";

export default function AddTodo(
    {
        onAddTask
    }:
    {
        onAddTask: (newTodo: Todo) => void
    }
){

    const [todoDescriptionInput, setTodoDescriptionInput] = useState('');
    const [priorityInput, setPriorityInput] = useState(1);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(todoDescriptionInput !== ''){

            const response = await fetch('http://localhost:8000/api/todos/create', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                description: todoDescriptionInput, 
                done: false, 
                priority: 1, 
            })
            })

            if(response.ok){
            const data = await response.json();
            // console.log('RESPONSE ON ADD TODO: ', response)
            // console.log('DATA ON ADD TODO: ', data)
            
            const newTodoToBeAdded: Todo = {
                id: data.todo.task_id, 
                description: todoDescriptionInput,
                done: false,
                priority: data.todo.priority
            }

            onAddTask(newTodoToBeAdded);
            setTodoDescriptionInput('');
        } 
        } else{
            alert("Type something before trying to add a todo.")
        }
    }
    
    return(
        <Box sx={{marginTop: 3}}>
            <form onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{ display: 'flex', gap: 1}}>
                <TextField type='text' label='Describe your new Todo.' value={todoDescriptionInput} onChange={(e) => setTodoDescriptionInput(e.target.value)} variant='outlined'></TextField>
                <TextField
                select
                label='Priority'
                value={priorityInput}
                onChange={(e) => setPriorityInput(Number(e.target.value))}
                >
                    <MenuItem value={1}>High</MenuItem>
                    <MenuItem value={2}>Average</MenuItem>
                    <MenuItem value={3}>Low</MenuItem>
                </TextField>
            </Box>
            <Button sx={{marginTop: 1}} type='submit' variant='outlined' color='success' fullWidth>Add New Todo</Button>
            </form>
        </Box>
    )
}