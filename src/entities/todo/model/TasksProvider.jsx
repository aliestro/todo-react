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
		newTaskTitleInputRef,
		addTask,
		editTask,
		selectTask,
		selectedTask,
		setSelectedTask,
		disapperingTaskId,
		apperingTaskId,
	} = useTasks();

	const isSearching = searchQuery.trim().length > 0;

	const {
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
	} = useIncompleteTaskScroll(isSearching ? filteredTasks : tasks);

	const value = useMemo(() => ({
		tasks,
		filteredTasks,
		deleteTask,
		deleteAllTasks,
		toggleTaskComplete,
		searchQuery,
		setSearchQuery,
		newTaskTitleInputRef,
		addTask,
		editTask,
		selectTask,
		selectedTask,
		setSelectedTask,
		disapperingTaskId,
		apperingTaskId,
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
	}), [
		tasks,
		filteredTasks,
		deleteTask,
		deleteAllTasks,
		toggleTaskComplete,
		searchQuery,
		setSearchQuery,
		newTaskTitleInputRef,
		addTask,
		editTask,
		selectTask,
		selectedTask,
		setSelectedTask,
		disapperingTaskId,
		apperingTaskId,
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
	]);

	return (
		<TasksContext.Provider value={value}>
			{children}
		</TasksContext.Provider>
	)
};