import TaskListComponent from './components/TaskListComponent.js';
import { TasksProvider } from './components/TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <TaskListComponent />
    </TasksProvider>
  );
}