import { useState, useEffect } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
    const [incompleteTasks, setIncompleteTasks] = useState(0);
    const tasks = useTasks();

    useEffect(() => {
        const filteredTasks = tasks.filter(ta => ta.done === false);
        setIncompleteTasks(filteredTasks.length);
    }, [tasks]);
    
    return (
        <>
        <p>Incomplete tasks: {incompleteTasks}</p>
        <ul>
        {tasks.map(task => (
            <li key={task.id}>
                <Task task={task} />
            </li>
        ))}
        </ul>
        </>
    );
}


function Task({ task }) {
    const dispatch = useTasksDispatch();

    return (
        <label>
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
            />

            {task.text}
            
            <button onClick={() => {
                dispatch({
                    type: 'deleted',
                    id: task.id
                });
            }}>
                Remove
            </button>
        </label>
    );
}
