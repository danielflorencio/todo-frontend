import { Checkbox, TableCell, TableRow } from "@mui/material";
import { Todo } from "../../types/todo";
import { useState } from "react";

export default function TodoItem({todo, todoStatus}: {todo: Todo, todoStatus: string}){
    
    const [isChecked, setIsChecked] = useState<boolean>(todo.done);

    const handleChangeIsChecked = async () => {    
        setIsChecked(!isChecked);
    }

    
    
    if(todoStatus === 'all'){
        return(
            <>
                <TableRow>
                    <TableCell align='center'>
                        <Checkbox value={isChecked} onClick={() => handleChangeIsChecked}/>
                    </TableCell>
                    <TableCell align='center'>{todo.description}</TableCell>
                    <TableCell align='center'>{todo.priority}</TableCell> 
                </TableRow>
            </>
        )
    } else if(todoStatus === 'todo'){
        return(
            <>
                {
                    todo.done === false ? (
                        <TableRow>
                            <TableCell align='center'>
                                <Checkbox value={isChecked} onClick={() => handleChangeIsChecked}/>
                            </TableCell>
                            <TableCell align='center'>{todo.description}</TableCell>
                            <TableCell align='center'>{todo.priority}</TableCell> 
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
                        <TableRow>
                            <TableCell align='center'>
                                <Checkbox value={isChecked} onClick={() => handleChangeIsChecked}/>
                            </TableCell>
                            <TableCell align='center'>{todo.description}</TableCell>
                            <TableCell align='center'>{todo.priority}</TableCell> 
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