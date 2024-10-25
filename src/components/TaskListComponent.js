import { useState, useEffect } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';
import AddTask from './AddTaskComponent.js';

export default function TaskListComponent() {
    const [incompleteTasks, setIncompleteTasks] = useState(0);
    const tasks = useTasks();

    useEffect(() => {
        const filteredTasks = tasks.filter(ta => ta.done === false);
        setIncompleteTasks(filteredTasks.length);
    }, [tasks]);
    
    return (
       <>
        <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <h1 className="flex justify-center font-semibold ml-3 text-lg">Task Manager</h1>

                <AddTask />

                <p className="font-semibold mb-5">Incomplete tasks: { incompleteTasks }</p>

                <div>
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                <Task task={task} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
       </>
    );
}


function Task({ task }) {
    const dispatch = useTasksDispatch();

    return (
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input 
                type="checkbox"
                checked={task.done}
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        task: {
                            ...task,
                            done: e.target.checked
                        }
                    });
                }}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-green-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-800 dark:border-gray-600"
            />

            <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                { task.text }
            </label>

            <button 
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mx-2 text-sm"
                onClick={() => {
                    dispatch({
                        type: 'deleted',
                        id: task.id
                    });
                }}
            >
                Remove
            </button>
        </div>
    );
}
