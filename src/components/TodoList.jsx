import ToDoItem from "./TodoItem"

const TodoList = (props) => {
	const {
		tasks = [],
		onDeleteTaskButtonClick,
		onTaskCompleteChange,
	} = props;

	const hasTasks = true;

	if (!hasTasks) {
		return (<div className="todo__empty-message">No tasks</div>)
	}
	return (
		<ul className="todo__list">
			{tasks.map((task) => (
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