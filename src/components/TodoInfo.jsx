const TodoInfo = (props) => {
	const {
		total,
		done,
		onDeleteAllButonClick,
	} = props;

	const hasTasks = total > 0;

	return (
		<div className="todo__info">
			<div className="todo__total-tasks">
				Done {done} from {total}
			</div>
			{hasTasks &&
				<button
					className="todo__delete-all-button"
					type="button"
					onClick={onDeleteAllButonClick}
				>
					Delete all
				</button>
			}
		</div>
	)
}

export default TodoInfo;