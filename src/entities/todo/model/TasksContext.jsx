import {
	createContext,
} from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
	const { children } = props;

	const {
		tasks,
		filteredTasks,
		deleteTask,
		deleteAllTasks,
		toggleTaskComplete,
		newTaskTitle,
		setNewTaskTitle,
		searchQuery,
		setSearchQuery,
		newTaskInputRef,
		addTask,
		disapperingTaskId,
		apperingTaskId,
	} = useTasks();

	const {
		firstIncopleteTaskRef,
		firstIncopleteTaskId,
	} = useIncompleteTaskScroll(tasks);

	return (
		<TasksContext.Provider value={{
			tasks,
			filteredTasks,
			firstIncopleteTaskRef,
			firstIncopleteTaskId,
			deleteTask,
			deleteAllTasks,
			toggleTaskComplete,
			newTaskTitle,
			setNewTaskTitle,
			searchQuery,
			setSearchQuery,
			newTaskInputRef,
			addTask,
			disapperingTaskId,
			apperingTaskId,
		}}>
			{children}
		</TasksContext.Provider>
	)
};