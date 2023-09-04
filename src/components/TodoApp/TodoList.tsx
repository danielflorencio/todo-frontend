import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Todo } from "../../types/todo"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import TodoItem from "./TodoItem";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }

export default function TodoList(
    {
        todos, 
        onChangeTodo,
        onDeleteTodo
    }:
    {
        todos: Todo[],
        onChangeTodo: (todo: Todo) => void,
        onDeleteTodo: (todo: Todo) => void
    }
){

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return(
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<CreateIcon/>} label="All Tasks" />
                <Tab icon={<ClearIcon/>} label="To Do" />
                <Tab icon={<CheckIcon/>} label="Done" />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <TableContainer component={Paper} >
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Status</TableCell>
                                <TableCell align='center'>Description</TableCell>
                                <TableCell align='center'>Priority</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            todos.map((todo) => (
                                <TodoItem todo={todo} todoStatus={'all'}/>
                            ))
                        }
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableContainer component={Paper} >
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Status</TableCell>
                                <TableCell align='center'>Description</TableCell>
                                <TableCell align='center'>Priority</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            todos.map((todo) => (
                                <TodoItem todo={todo} todoStatus={'todo'}/>
                            ))
                        }
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <TableContainer component={Paper} >
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Status</TableCell>
                                <TableCell align='center'>Description</TableCell>
                                <TableCell align='center'>Priority</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            todos.map((todo) => (
                                <TodoItem todo={todo} todoStatus={'done'}/>
                            ))
                        }
                    </Table>
                </TableContainer> 
            </CustomTabPanel>
        </>
    )
}