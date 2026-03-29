import { useContext, useState } from "react";
import Field from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";
import Button from "@/shared/ui/Button";

const MAX_LENGTH = 50;

const VALIDATION_RULES = {
	isOnlySpaces: (value) => value.length > 0 && value.trim().length === 0,
	isTooLong: (value) => value.length > MAX_LENGTH,
};

const ERROR_MESSAGES = {
	isOnlySpaces: 'Task cannot consist only of spaces',
	isTooLong: `Maximum length is ${MAX_LENGTH} characters`,
};

const AddTaskForm = (props) => {
	const { styles } = props;
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [error, setError] = useState('');

	const { addTask, newTaskInputRef } = useContext(TasksContext);

	const isNewTasksTitleEmpty = newTaskTitle.trim().length === 0;

	const onSubmit = (event) => {
		event.preventDefault();
		if (!isNewTasksTitleEmpty && !error) {
			addTask(newTaskTitle.trim(), () => {
				setNewTaskTitle('');
				setError('');
			});
		}
	}

	const onInput = (event) => {
		const { value } = event.target;

		// if (value.length > MAX_LENGTH) {
		// 	setError(ERROR_MESSAGES['isTooLong']);
		// 	return;
		// }

		const errorKey = Object.keys(VALIDATION_RULES)
			.find(key => VALIDATION_RULES[key](value));

		setNewTaskTitle(value);
		setError(ERROR_MESSAGES[errorKey] || '');
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<Field
				className={styles.field}
				label="New task"
				id="new-task"
				value={newTaskTitle}
				error={error}
				onInput={onInput}
				ref={newTaskInputRef}
			/>
			<Button
				type="submit"
				isDisabled={isNewTasksTitleEmpty || !!error}
			>
				Add
			</Button>
		</form>
	)
}

export default AddTaskForm;
