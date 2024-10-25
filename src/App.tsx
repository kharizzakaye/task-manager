import TaskListComponent from './components/TaskListComponent';
import { TasksProvider } from './components/TasksContext';

export default function TaskApp() {
  return (
    <TasksProvider>
      <TaskListComponent />
    </TasksProvider>
  );
}