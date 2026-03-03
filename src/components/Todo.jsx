import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'

const Todo = () => {
	const tasks = [
		{ id: 'task-1', title: 'Посмотреть видео про паттерны', isDone: false },
		{ id: 'task-2', title: 'Покушать хурму', isDone: false },
	]

	const deleteAllTasks = () => {
		console.log('Delete all tasks')
	}

	const deleteTask = (taskId) => {
		console.log('Delete task', taskId)
	}

	const ToggleTaskComplete = (taskId, isDone) => {
		console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`)
	}

	const filterTasks = (query) => {
		console.log(`Поиск: ${query}`)
	}

	const addTask = () => {
		console.log('Добавить задачу');
	}

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm
				addTask={addTask}
			/>
			<SearchTaskForm
				onSearchInput={filterTasks}
			/>
			<TodoInfo
				total={tasks.length}
				done={tasks.filter(({ isDone }) => isDone).length}
				onDeleteAllButonClick={deleteAllTasks}
			/>
			<TodoList
				tasks={tasks}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompleteChange={ToggleTaskComplete}
			/>
		</div>
	)
}

export default Todo