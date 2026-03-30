import { useContext, useState } from "react";
import Field from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";
import Button from "@/shared/ui/Button";

const MAX_LENGTH = {
	title: 50,
	description: 200, // или любое другое значение
};

const VALIDATION_RULES = {
	isOnlySpaces: (value) => value.length > 0 && value.trim().length === 0,
	isTooLong: (value, maxLength) => value.length > maxLength,
};

const ERROR_MESSAGES = {
	isOnlySpaces: 'Task cannot consist only of spaces',
	isTooLong: (maxLength) => `Maximum length is ${maxLength} characters`,
};

const AddTaskForm = (props) => {
	const { styles } = props;
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [newTaskDescription, setNewTaskDescription] = useState('');
	const [error, setError] = useState({ title: '', description: '' });

	const { addTask, newTaskTitleInputRef } = useContext(TasksContext);

	const isNewTasksTitleEmpty = newTaskTitle.trim().length === 0;
	const hasError = error.title || error.description;

	const onSubmit = (event) => {
		event.preventDefault();
		if (!isNewTasksTitleEmpty && !hasError) {
			addTask(newTaskTitle.trim(), newTaskDescription.trim(), () => {
				setNewTaskTitle('');
				setNewTaskDescription('');
				setError({ title: '', description: '' });
			});
		}
	}

	const onInput = (fieldName) => (event) => {
		const { value } = event.target;
		const maxLength = MAX_LENGTH[fieldName];

		// Обновляем соответствующее состояние
		if (fieldName === 'title') {
			setNewTaskTitle(value);
		} else {
			setNewTaskDescription(value);
		}

		// Валидация
		let validationError = '';

		if (VALIDATION_RULES.isOnlySpaces(value)) {
			validationError = ERROR_MESSAGES.isOnlySpaces;
		} else if (VALIDATION_RULES.isTooLong(value, maxLength)) {
			validationError = ERROR_MESSAGES.isTooLong(maxLength);
		}

		setError(prev => ({
			...prev,
			[fieldName]: validationError
		}));
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<Field
				className={styles.fieldTitle}
				label="New task title"
				id="new-task-title"
				value={newTaskTitle}
				error={error.title}
				onInput={onInput("title")}
				ref={newTaskTitleInputRef}
			/>
			<Field
				className={styles.field}
				label="New task description"
				id="new-task-description"
				value={newTaskDescription}
				error={error.description}
				onInput={onInput("description")}
			/>
			<Button
				type="submit"
				isDisabled={isNewTasksTitleEmpty || !!hasError}
			>
				Add New Task
			</Button>
		</form>
	)
}

export default AddTaskForm;