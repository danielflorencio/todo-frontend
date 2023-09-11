import { Todo } from "../types/todo";

interface TodoActionProps {
    type: string, 
    todo: Todo
} 

export default function todoReducer(todos: Todo[], action: TodoActionProps) {
    switch (action.type) {
      case 'clear': {
        return []
      }
      // case 'update': {
      //   const newTodoState: Todo | undefined= todos.find((todo: Todo) => todo.id === action.todo.id);
      //   return [{
      //     ...newTodoState, 
      //       description: action.todo.description, 
      //       done: action.todo.done, 
      //       priority: action.todo.priority
      //   }]
      //   // let newTodoState = todos.filter((todo) => todo.id !== action.todo.id);
      //   // newTodoState = action.todo;
      //   // return [...newTodoState];
      // }
      case 'added': {
        return [
          ...todos,
          {
            id: action.todo.id,
            description: action.todo.description,
            done: action.todo.done,
            priority: action.todo.priority
          },
        ];
      }
      case 'changed': {
        return todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return action.todo;
          } else {
            return todo;
          }
        });
      }
      case 'deleted': {
        return todos.filter((todo) => todo.id !== action.todo.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  