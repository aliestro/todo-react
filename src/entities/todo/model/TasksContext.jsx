import {
	createContext,
	useMemo,
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

	const value = useMemo(() => ({
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
		firstIncopleteTaskRef,
		firstIncopleteTaskId,
	}), [
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
		firstIncopleteTaskRef,
		firstIncopleteTaskId,
	]);

	return (
		<TasksContext.Provider value={value}>
			{children}
		</TasksContext.Provider>
	)
};