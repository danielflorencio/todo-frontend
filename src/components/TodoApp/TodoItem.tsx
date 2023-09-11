import { Button, Checkbox, MenuItem, TableCell, TableRow, TextField } from "@mui/material";
import { Todo } from "../../types/todo";
import { useState } from "react";
import CreateIcon from '@mui/icons-material/Create';

export default function TodoItem({todo, todoStatus, updateTodosData}: {todo: Todo, todoStatus: string, updateTodosData: () => void}){
    
    // const [todo.done, setIsChecked] = useState<boolean>(todo.done);
    const [priority, setPriority] = useState<number>(todo.priority);
    const [descriptionMode, setDescriptionMode] = useState<'show' | 'edit'>('show');
    const [descriptionInput, setDescriptionIput] = useState(todo.description); 


    // console.log(`Todo Id ${todo.id} isDone: ${todo.done} - todo.done: ${todo.done}`);

    const handleChangeIsChecked = async () => {   
        const changeIsCheckedStatus = async () => {
            const response = await fetch(`http://localhost:8000/api/todos/editTodo?id=${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${localStorage.getItem('token')}`
                }, 
                body: JSON.stringify({
                    description: todo.description, 
                    done: !todo.done, 
                    priority: todo.priority,
                })
            })
            console.log('RESPONSE ON HANDLECHANGEISCHECKED: ', response)
            if(response.ok){
                console.log('RESPONSE ON HANDLECHANGEISCHECKED: ', response)
                updateTodosData();
            }
        }
        await changeIsCheckedStatus();
    }

    const handleModeChange = () => {
        if(descriptionMode === 'show'){
            setDescriptionMode('edit');
        } else{
            setDescriptionMode('show');
        }
    }
    
    
    if(todoStatus === 'all'){
        return(
            <>
                <TableRow selected={todo.done}>
                    <TableCell align='left'>
                        <Checkbox checked={todo.done} value={todo.done} onClick={() => handleChangeIsChecked()}/>
                    </TableCell>
                    <TableCell align='center'>
                        {
                            descriptionMode === 'show' ? (
                                <>{todo.description}</>
                            ) : (
                                <TextField
                                value={descriptionInput}
                                onChange={(e) => setDescriptionIput(e.target.value)}
                                onBlur={() => handleModeChange()}
                                />        
                            )
                        }                         
                    </TableCell>
                    <TableCell align='center'>
                    <Button variant="outlined" onClick={handleModeChange} startIcon={<CreateIcon />}>
                        Edit
                    </Button>
                    </TableCell>
                    <TableCell align='right'>
                        <TextField
                        select
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        label='Priority'
                        >
                            <MenuItem value={1}>High</MenuItem>
                            <MenuItem value={2}>Average</MenuItem>
                            <MenuItem value={3}>Low</MenuItem>
                        </TextField>
                    </TableCell> 
                </TableRow>
            </>
        )
    } else if(todoStatus === 'todo'){
        return(
            <>
                {
                    todo.done === false ? (
                        <TableRow selected={todo.done}>
                            <TableCell align='center'>
                                <Checkbox checked={todo.done} value={todo.done} onClick={() => handleChangeIsChecked()}/>
                            </TableCell>
                            <TableCell align='center'>
                                {todo.description}
                            </TableCell>
                            <TableCell align='right'>
                                <TextField
                                select
                                value={priority}
                                onChange={(e) => setPriority(Number(e.target.value))}
                                label='Priority'
                                >
                                    <MenuItem value={1}>High</MenuItem>
                                    <MenuItem value={2}>Average</MenuItem>
                                    <MenuItem value={3}>Low</MenuItem>
                                </TextField>
                            </TableCell> 
                        </TableRow>
                    ) : (
                        <></>
                    )
                }
            </>
        )
    } else if(todoStatus === 'done'){
        return(
            <>
                {
                    todo.done === true ? (
                        <TableRow selected={todo.done}>
                            <TableCell align='center'>
                                <Checkbox checked={todo.done} value={todo.done} onClick={() => handleChangeIsChecked()}/>
                            </TableCell>
                            <TableCell align='center'>{todo.description}</TableCell>
                            <TableCell align='center'>
                            <TableCell align='right'>
                                <TextField
                                disabled
                                select
                                value={priority}
                                onChange={(e) => setPriority(Number(e.target.value))}
                                label='Priority'
                                >
                                    <MenuItem value={1}>High</MenuItem>
                                    <MenuItem value={2}>Average</MenuItem>
                                    <MenuItem value={3}>Low</MenuItem>
                                </TextField>
                            </TableCell>    
                            </TableCell> 
                        </TableRow>
                    ) : (
                        <></>
                    )
                }
            </>
        )
    }

    
    return <></>
}