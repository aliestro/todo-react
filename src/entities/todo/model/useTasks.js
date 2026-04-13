import { useCallback, useEffect, useMemo, useRef, useState, useReducer } from "react";
import tasksAPI from "@/shared/api/tasks";

const taskReducer = (state, action) => {
	switch (action.type) {
		case 'SET_ALL': {
			return Array.isArray(action.tasks) ? action.tasks : state;
		}
		case 'ADD': {
			return [...state, action.task];
		}
		case 'EDIT': {
			return state.map((task) =>
				task.id === action.task.id ? action.task : task
			);
		}
		case 'TOGGLE_COMPLETE': {
			const { id, isDone } = action;
			return state.map((task) => {
				return task.id === id ? { ...task, isDone } : task
			}
			);
		}
		case 'DELETE': {
			return state.filter((task) => task.id !== action.id);
		}
		case 'DELETE_ALL': {
			return []
		}
		default: {
			return state
		}
	}
}

const useTasks = () => {
	const [tasks, dispatch] = useReducer(taskReducer, []);

	const [searchQuery, setSearchQuery] = useState('');
	const [disapperingTaskId, setDisapperingTaskId] = useState(null);
	const [apperingTaskId, setApperingTaskId] = useState(null);
	const [selectedTask, setSelectedTask] = useState(null);

	const newTaskTitleInputRef = useRef(null);

	const deleteAllTasks = useCallback((callbackAfterDeleting) => {
		const isConfirmed = confirm('Вы действительно хотите удалить все задачи?');

		if (isConfirmed) {
			tasksAPI.deleteAll(tasks).
				then(() => {
					dispatch({ type: 'DELETE_ALL' });
					callbackAfterDeleting();
				});
		}
	}, [tasks])

	const deleteTask = useCallback((taskId, callbackAfterDeleting) => {
		tasksAPI.delete(taskId)
			.then(() => {
				setDisapperingTaskId(taskId);
				callbackAfterDeleting();
				setTimeout(() => {
					dispatch({ type: 'DELETE', id: taskId });
					setDisapperingTaskId(null);
				}, 400)
			})
	}, []);

	const toggleTaskComplete = useCallback((taskId, isDone) => {
		tasksAPI.toggleCompete(taskId, isDone)
			.then(() => {
				dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone })
			});
	}, []);

	const addTask = useCallback((title, description, callbackAfterAdding) => {
		const newTask = {
			title,
			description,
			isDone: false,
		}
		tasksAPI.add(newTask)
			.then((addedTask) => {
				dispatch({ type: 'ADD', task: addedTask });
				callbackAfterAdding();
				setSearchQuery('');
				newTaskTitleInputRef.current.focus();
				setApperingTaskId(addedTask.id);
				setTimeout(() => {
					setApperingTaskId(null)
				}, 400);
			})
	}, [])

	const editTask = useCallback((task, callbackAfterEditing) => {
		tasksAPI.edit(task)
			.then(() => {
				dispatch({ type: 'EDIT', task })
				callbackAfterEditing();
			});
	}, [])

	const selectTask = useCallback((taskId) => {
		if (taskId === null) {
			setSelectedTask(null);
			return;
		}

		tasksAPI.getById(taskId)
			.then((task) => {
				setSelectedTask(task);
			})
			.catch(error => {
				console.error('Failed to load task:', error);
			});
	}, [])

	useEffect(() => {
		newTaskTitleInputRef.current.focus();
		tasksAPI.getAll().then((serverTasks) => {
			dispatch({ type: 'SET_ALL', tasks: serverTasks })
		});
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
		searchQuery,
		setSearchQuery,
		newTaskTitleInputRef,
		addTask,
		editTask,
		selectTask,
		setSelectedTask,
		selectedTask,
		disapperingTaskId,
		apperingTaskId,
	}
}

export default useTasks;