'use client'
import { useEffect, useReducer, useRef } from 'react';
import AddTodo from './AddTodo.tsx';
import TodoList from './TodoList.tsx';
import todoReducer from '../../reducers/todoReducer.ts';
import { Todo } from '../../types/todo.ts';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
export default function TodoApp() {
  
  const [todos, dispatch] = useReducer(todoReducer, []);

  const isFetching = useRef(false);

  async function handleAddTodo(newTodoToBeAdded: Todo) {    
    dispatch({
      type: 'added',
      todo: newTodoToBeAdded
    });
  }

  function handleChangeTodo(todo: Todo) {
    dispatch({
      type: 'changed',
      todo: todo,
    });
  }

  function handleDeleteTodo(todo: Todo) {
    dispatch({
      type: 'deleted',
      todo: todo
    });
  }

  function updateTodoList(todo: Todo){
    dispatch({
      type: 'updated', 
      todo: todo
    })
  }

  const loadTodosData = async () => {
    
    dispatch({
      type: 'clear',
      todo: {id: 0, description: '', done: false, priority: 0}
    })

    const response = await fetch('http://localhost:8000/api/todos/getTodos', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`
      }
    })
    if(response.ok){
      const data = await response.json();
      console.log('TODOS DATA: ', data)

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

      

      console.log('TODOS STATE: ', todos)
    }
    isFetching.current = false;
  }

  useEffect(() => {
    // const loadTodosData = async () => {
    //   const response = await fetch('http://localhost:8000/api/todos/getTodos', {
    //     method: 'GET', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'authorization': `${localStorage.getItem('token')}`
    //     }
    //   })
    //   if(response.ok){
    //     const data = await response.json();
    //     console.log('TODOS DATA: ', data)

    //     const TodosToBeAdded: Todo[] = await data.todos.map((todo: any) => {
    //       return {
    //         description: todo.description, 
    //         id: todo.task_id, 
    //         priority: todo.priority, 
    //         done: todo.done
    //       }
    //     })

    //     TodosToBeAdded.map((todo) => {
    //       handleAddTodo(todo);
    //     })

    //     console.log('TODOS STATE: ', todos)
    //   }
    //   isFetching.current = false;
    // }

    if(isFetching.current) return

    isFetching.current = true;
    loadTodosData();
  }, [])

  useEffect(() => {
    console.log('TODOS STATE (updated): ', todos)
  }, [todos])

  return (
    <>
    <AppBar position="fixed" sx={{padding: 2}}>
      {/* <Toolbar> */}
        Test
      {/* </Toolbar> */}
    </AppBar>
    <Toolbar/>
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 2}}>
      <Box sx={{width: '400px'}}>
      <Typography variant='h4' sx={{textAlign: 'center'}}>Painel de Tarefas</Typography>
      <AddTodo onAddTask={handleAddTodo} />
      <TodoList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
        updateTodosData={loadTodosData}
      />
      </Box>
    </Box>
    </>
  );
}