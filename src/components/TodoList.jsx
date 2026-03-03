import ToDoItem from "./TodoItem"

const TodoList = (props) => {
	const {
		tasks = [],
		onDeleteTaskButtonClick,
		onTaskCompleteChange,
		filteredTasks,
	} = props;

	const hasTasks = tasks.length > 0;
	const isEmptyFilteredTasks = filteredTasks?.length === 0;

	if (!hasTasks) {
		return (<div className="todo__empty-message">There are no tasks yet</div>)
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return (<div className="todo__empty-message">Task not found</div>)
	}

	return (
		<ul className="todo__list">
			{(filteredTasks ?? tasks).map((task) => (
				<ToDoItem
					className="todo__item"
					key={task.id}
					onDeleteTaskButtonClick={onDeleteTaskButtonClick}
					onTaskCompleteChange={onTaskCompleteChange}
					{...task}
				/>
			))}
		</ul>
	)
}

export default TodoList