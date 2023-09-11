import { useState } from "react";
import { Todo } from "../../types/todo"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, TextField } from "@mui/material";

export default function AddTodo(
    {
        onAddTask
    }:
    {
        onAddTask: (newTodo: Todo) => void
    }
){

    const [open, setOpen] = useState<boolean>(false);
    const [todoDescriptionInput, setTodoDescriptionInput] = useState('');
    const [priorityInput, setPriorityInput] = useState(1);
    

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };

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
        // <Box sx={{marginTop: 3}}>
        //     <form onSubmit={(e) => handleSubmit(e)}>
        //     <Box sx={{ display: 'flex', gap: 1}}>
        //         <TextField type='text' label='Describe your new Todo.' value={todoDescriptionInput} onChange={(e) => setTodoDescriptionInput(e.target.value)} variant='outlined'></TextField>
        //         <TextField
        //         select
        //         label='Priority'
        //         value={priorityInput}
        //         onChange={(e) => setPriorityInput(Number(e.target.value))}
        //         >
        //             <MenuItem value={1}>High</MenuItem>
        //             <MenuItem value={2}>Average</MenuItem>
        //             <MenuItem value={3}>Low</MenuItem>
        //         </TextField>
        //     </Box>
        //     <Button sx={{marginTop: 1}} type='submit' variant='outlined' color='success' fullWidth>Add New Todo</Button>
        //     </form>
        // </Box>
        <>
        <Button variant="outlined" color='success' sx={{width: '100%', marginTop: 1}} onClick={handleClickOpen}>
        Add Todo
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{fontSize: '1.6rem', textAlign: 'center', marginBottom: -4}}>Create new todo</DialogTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
            <DialogContent>
            <Divider sx={{marginY: 2}}/>
            <Box sx={{display: 'flex', gap: 1}}>
            <TextField 
            type='text' 
            label='Describe your new Todo.' 
            value={todoDescriptionInput} 
            onChange={(e) => setTodoDescriptionInput(e.target.value)} 
            variant='outlined'></TextField>
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
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Create Todo</Button>
            </DialogActions>
            </form>
        </Dialog>
        </>
    )
}