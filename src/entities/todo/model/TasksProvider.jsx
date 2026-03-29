import {
	useMemo,
} from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";
import { TasksContext } from "./TasksContext";

export const TasksProvider = (props) => {
	const { children } = props;

	const {
		tasks,
		filteredTasks,
		deleteTask,
		deleteAllTasks,
		toggleTaskComplete,
		searchQuery,
		setSearchQuery,
		newTaskInputRef,
		addTask,
		disapperingTaskId,
		apperingTaskId,
	} = useTasks();

	const isSearching = searchQuery.trim().length > 0;

	const {
		firstIncopleteTaskRef,
		firstIncopleteTaskId,
	} = useIncompleteTaskScroll(isSearching ? filteredTasks : tasks);

	const value = useMemo(() => ({
		tasks,
		filteredTasks,
		deleteTask,
		deleteAllTasks,
		toggleTaskComplete,
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