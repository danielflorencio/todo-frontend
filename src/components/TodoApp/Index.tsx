'use client'
import { useEffect, useReducer, useRef, useState } from 'react';
import AddTodo from './AddTodo.tsx';
import TodoList from './TodoList.tsx';
import todoReducer from '../../reducers/todoReducer.ts';
import { Todo } from '../../types/todo.ts';
import { AppBar, Box, Button, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks.ts';
import { logout } from '../../features/sessionControl/sessionSlice.ts';
export default function TodoApp() {

  const [showPriorities, setShowPriorities] = useState<number>(0);
  const [todos, dispatch] = useReducer(todoReducer, []);

  const isFetching = useRef(false);

  const navigate = useNavigate();

  const reduxDispatch = useAppDispatch();

  const handleLogout = async () => {
      reduxDispatch(logout());
      navigate('/login');
  }

  async function handleAddTodo(newTodoToBeAdded: Todo) {    
    dispatch({
      type: 'added',
      todo: newTodoToBeAdded
    });
  }

  // function handleChangeTodo(todo: Todo) {
  //   dispatch({
  //     type: 'changed',
  //     todo: todo,
  //   });
  // }

  // function handleDeleteTodo(todo: Todo) {
  //   dispatch({
  //     type: 'deleted',
  //     todo: todo
  //   });
  // }

  // function updateTodoList(todo: Todo){
  //   dispatch({
  //     type: 'updated', 
  //     todo: todo
  //   })
  // }

  const loadTodosData = async () => {
    
    dispatch({
      type: 'clear',
      todo: {id: 0, description: '', done: false, priority: 0}
    })

    const response = await fetch('http://18.144.133.195:8000/api/todos/getTodos', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`
      }
    })
    if(response.ok){
      const data = await response.json();

      let TodosToBeAdded: Todo[] = await data.todos.map((todo: any) => {
        return {
          description: todo.description, 
          id: todo.task_id, 
          priority: todo.priority, 
          done: todo.done
        }
      })

      let SortedTodosToBeAdded = TodosToBeAdded.sort((a, b) => a.priority - b.priority);

      SortedTodosToBeAdded.map((todo) => {
        handleAddTodo(todo);
      })

    }
    isFetching.current = false;
  }

  useEffect(() => {

    if(isFetching.current) return

    isFetching.current = true;
    loadTodosData();
  }, [])

  return (
    <>
    <Toolbar>
    <AppBar position="fixed" sx={{padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button variant='contained' sx={{width: 'fit-content'}} onClick={handleLogout}>Logout</Button>
    </AppBar>
    </Toolbar>
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 1}}>
      <Box sx={{sm: {width: '100%'}, md: {width: '400px'}}}>
      <Typography variant='h4' sx={{textAlign: 'center'}}>Painel de Tarefas</Typography>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 4, gap: 2}}>
        <AddTodo onAddTask={handleAddTodo} />
        <TextField value={showPriorities} onChange={(e) => setShowPriorities(Number(e.target.value))} sx={{width: 'fit-content'}} size='small' select label='Show priorities'>
          <MenuItem value={0}>Show all</MenuItem>
          <MenuItem value={1}>Show high</MenuItem>
          <MenuItem value={2}>Show average</MenuItem>
          <MenuItem value={3}>Show low</MenuItem>
        </TextField>
      </Box>
      <TodoList
        todos={todos}
        // onChangeTodo={handleChangeTodo}
        // onDeleteTodo={handleDeleteTodo}
        updateTodosData={loadTodosData}
        showPriority={showPriorities}
      />
      </Box>
    </Box>
    </>
  );
}