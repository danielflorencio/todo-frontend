import { Todo } from "../types/todo";

interface TodoActionProps {
    type: string, 
    todo: Todo
} 

export default function todoReducer(todos: Todo[], action: TodoActionProps) {
    switch (action.type) {
      case 'added': {
        return [
          ...todos,
          {
            id: action.todo.id,
            description: action.todo.description,
            done: false,
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
  