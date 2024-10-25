import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext<any>(null); // provides current list of tasks
const TasksDispatchContext = createContext<any>(null); // provides teh function that lets components dispatch actions

const initialTasks = [
  { id: 0, text: 'Water the plants', done: true },
  { id: 1, text: 'Read a mystery book', done: false },
  { id: 2, text: 'Cook a delicious dinner', done: false }
];

export function TasksProvider({ children } : any) 
{
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() 
{
  return useContext(TasksContext);
}

export function useTasksDispatch() 
{
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks: any, action: any) 
{
  switch (action.type) 
  {
    case 'added': 
    {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': 
    {
      return tasks.map((item: any) => {
        if (item.id === action.task.id) 
        {
          return action.task;
        } 
        else 
        {
          return item;
        }
      });
    }
    case 'deleted': 
    {
      return tasks.filter((task: any) => task.id !== action.id);
    }
    default: 
    {
      throw Error('Unknown action: ' + action.type);
    }
  }
}