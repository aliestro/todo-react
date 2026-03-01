import ToDoItem from "./TodoItem"

const TodoList = (props) => {
	const {
		tasks = [],
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
					{...task}
				/>
			))}
		</ul>
	)
}

export default TodoList