import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import tasksAPI from "../API/tasksAPI";

const useTasks = () => {


	const [tasks, setTasks] = useState([]);


	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [disapperingTaskId, setDisapperingTaskId] = useState(null);
	const [apperingTaskId, setApperingTaskId] = useState(null);

	const newTaskInputRef = useRef(null);

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Вы действительно хотите удалить все задачи?');

		if (isConfirmed) {
			setTasks([]);
		}

		tasksAPI.deleteAll(tasks).
			then(() => setTasks([]));
	}, [tasks])

	const deleteTask = useCallback((taskId) => {
		tasksAPI.delete(taskId)
			.then(() => {
				setDisapperingTaskId(taskId);
				setTimeout(() => {
					setTasks(tasks.filter((task) => task.id !== taskId));
					setDisapperingTaskId(null);
				}, 400)
			})
	}, [tasks]);

	const toggleTaskComplete = useCallback((taskId, isDone) => {
		tasksAPI.toggleCompete(taskId, isDone)
			.then(() => setTasks(
				tasks.map((task) => task.id === taskId ? { ...task, isDone } : task)
			))
	}, [tasks]);

	const addTask = useCallback((title) => {
		const newTask = {
			title,
			isDone: false,
		}
		tasksAPI.add(newTask)
			.then((addedTask) => {
				setTasks((prevTasks) => [...prevTasks, addedTask]);
				setNewTaskTitle('');
				setSearchQuery('');
				newTaskInputRef.current.focus();
				setApperingTaskId(addedTask.id);
				setTimeout(() => {
					setApperingTaskId(null)
				}, 400);
			})
	}, [])

	useEffect(() => {
		newTaskInputRef.current.focus();
		tasksAPI.getAll().then(setTasks);
	}, [])

	const filteredTasks = useMemo(() => {
		const clearSearchQuery = searchQuery.trim().toLowerCase();
		return clearSearchQuery.length > 0
			? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
			: null
	}, [searchQuery, tasks]);

	return {
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
	}
}

export default useTasks;