import { useContext, useState } from "react";
import Button from "./Button"
import Field from "./Fieild"
import { TasksContext } from "../context/TasksContext";

const AddTaskForm = () => {
	const {
		addTask,
		newTaskTitle,
		setNewTaskTitle,
		newTaskInputRef,
	} = useContext(TasksContext);

	const clearNewTaskTitle = newTaskTitle.trim();
	const isNewTasksTitleEmpty = newTaskTitle.trim().length === 0;

	const [error, setError] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		if (!isNewTasksTitleEmpty) {
			addTask(clearNewTaskTitle);
		}
	}

	const onInput = (event) => {
		const { value } = event.target;
		const clearValue = value.trim();
		const hasOnlySpaces = value.length > 0 && clearValue.length === 0;
		setNewTaskTitle(value);
		setError(hasOnlySpaces ? 'The task can not be empty' : '');
	}

	return (
		<form
			className="todo__form"
			onSubmit={onSubmit}
		>
			<Field
				className="todo__field"
				label="New task"
				id="new-task"
				value={newTaskTitle}
				error={error}
				onInput={onInput}
				ref={newTaskInputRef}
			/>
			<Button
				type="submit"
				isDisabled={isNewTasksTitleEmpty}
			>
				Add
			</Button>
		</form>
	)
}

export default AddTaskForm;