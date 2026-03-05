import { useMemo, useCallback, useEffect, useRef, useState } from 'react'
import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'
import Button from './Button'

const Todo = () => {
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

	const ToggleTaskComplete = useCallback((taskId, isDone) => {
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

	const doneTasks = useMemo(() => {
		return tasks.filter(({ isDone }) => isDone).length;
	}, [tasks]);

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm
				addTask={addTask}
				newTaskTitle={newTaskTitle}
				setNewTaskTitle={setNewTaskTitle}
				newTaskInputRef={newTaskInputRef}
			/>
			<SearchTaskForm
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<TodoInfo
				total={tasks.length}
				done={doneTasks}
				onDeleteAllButonClick={deleteAllTasks}
			/>
			<Button onClick={() => { firstIncopleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' }) }}>
				Show first incomplete task
			</Button>
			<TodoList
				tasks={tasks}
				filteredTasks={filterTasks}
				firstIncopleteTaskRef={firstIncopleteTaskRef}
				firstIncopleteTaskId={firstIncopleteTaskId}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompleteChange={ToggleTaskComplete}
			/>
		</div >
	)
}

export default Todo;