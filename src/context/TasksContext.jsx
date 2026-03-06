import {
	createContext,
	useRef,
	useState,
	useCallback,
	useEffect,
	useMemo
} from "react";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
	const { children } = props;

	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem('tasks');

		if (savedTasks) {
			return JSON.parse(savedTasks);
		}
		return [
			{ id: 'task-1', title: 'Посмотреть видео про паттерны', isDone: false },
			{ id: 'task-2', title: 'Покушать хурму', isDone: false },
		];
	})


	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const newTaskInputRef = useRef(null);
	const firstIncopleteTaskRef = useRef(null);
	const firstIncopleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Вы действительно хотите удалить все задачи?');

		if (isConfirmed) {
			setTasks([]);
		}
	}, [])

	const deleteTask = useCallback((taskId) => {
		setTasks(
			tasks.filter((task) => task.id !== taskId)
		)
	}, [tasks]);

	const toggleTaskComplete = useCallback((taskId, isDone) => {
		setTasks(
			tasks.map((task) => task.id === taskId ? { ...task, isDone } : task)
		)
	}, [tasks]);

	const addTask = useCallback(() => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				title: newTaskTitle,
				isDone: false,
			}
			setTasks((prevTasks) => [...prevTasks, newTask]);
			setNewTaskTitle('');
			setSearchQuery('');
			newTaskInputRef.current.focus();
		}
	}, [newTaskTitle])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks])

	useEffect(() => {
		newTaskInputRef.current.focus();
	}, [])

	const filterTasks = useMemo(() => {
		const clearSearchQuery = searchQuery.trim().toLowerCase();
		return clearSearchQuery.length > 0
			? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
			: null
	}, [searchQuery, tasks]);


	return (
		<TasksContext.Provider value={{
			tasks,
			filterTasks,
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
		}}>
			{children}
		</TasksContext.Provider>
	)
};