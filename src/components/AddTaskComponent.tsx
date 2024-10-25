import { useState } from 'react';
import { useTasksDispatch } from "./TasksContext";

export default function AddTask() {
  const [text, setText] = useState<string>('');
  const dispatch = useTasksDispatch();

  const onAddTaskHandler = () => {
    if (text == "")
    {
      return;
    }

    setText("");
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    }); 
  }


  return (
    <>
      <div className="py-7">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input 
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="text" 
            placeholder="Type task here"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          
          <button 
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
            type="button"
            onClick={onAddTaskHandler}
          >
            Add Task
          </button>
        </div>
      </div>
    </>
  );
}

let nextId = 3;