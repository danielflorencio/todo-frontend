import { Button, Checkbox, IconButton, MenuItem, Table, TableCell, TableRow, TextField } from "@mui/material";
import { Todo } from "../../types/todo";
import React, { useState } from "react";
import CreateIcon from '@mui/icons-material/Create';

export default function TodoItem({todo, todoStatus, updateTodosData}: {todo: Todo, todoStatus: string, updateTodosData: () => void}){
    
    const [priority, setPriority] = useState<number>(todo.priority);
    const [descriptionMode, setDescriptionMode] = useState<'show' | 'edit'>('show');
    const [descriptionInput, setDescriptionIput] = useState(todo.description); 

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
            if(response.ok){
                updateTodosData();
            }
        }
        await changeIsCheckedStatus();
    }

    const updateTodoDescription = async () => {
        const response = await fetch(`http://localhost:8000/api/todos/editTodo?id=${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify({
                description: descriptionInput, 
                done: todo.done, 
                priority: todo.priority,
            })
        })
        if(response.ok){
            updateTodosData();
            setDescriptionMode('show');
        }
    }

    const handleUpdateTodoDescription = async () => {   
        await updateTodoDescription();
    }

    const handleUpdateTodoDescriptionEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateTodoDescription();
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
                                <form onSubmit={(e) => handleUpdateTodoDescriptionEvent(e)}>
                                <TextField
                                value={descriptionInput}
                                onChange={(e) => setDescriptionIput(e.target.value)}
                                onBlur={() => handleUpdateTodoDescription()}
                                />
                                </form>     
                            )
                        }                         
                    </TableCell>
                    <TableCell align='right'>
                    <IconButton type='submit' onClick={handleModeChange}>
                        <CreateIcon></CreateIcon>
                    </IconButton>
                    </TableCell>
                    <TableCell align='right'>
                        <TextField
                        select
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        label='Priority'
                        disabled={todo.done}
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
                                {
                                    descriptionMode === 'show' ? (
                                        <>{todo.description}</>
                                    ) : (
                                        <form onSubmit={(e) => handleUpdateTodoDescriptionEvent(e)}>
                                        <TextField
                                        value={descriptionInput}
                                        onChange={(e) => setDescriptionIput(e.target.value)}
                                        onBlur={() => handleUpdateTodoDescription()}
                                        />
                                        </form>
                                    )
                                }                         
                            </TableCell>
                            <TableCell align='right'>
                            <IconButton onClick={handleModeChange}>
                                <CreateIcon></CreateIcon>
                            </IconButton>
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