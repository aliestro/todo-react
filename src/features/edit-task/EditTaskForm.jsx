import { useContext, useState, useEffect } from "react";
import Field from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";
import Button from "@/shared/ui/Button";
import Textarea from "@/shared/ui/Textarea";

const MAX_LENGTH = {
	title: 50,
	description: 200,
};

const VALIDATION_RULES = {
	isOnlySpaces: (value) => value.length > 0 && value.trim().length === 0,
	isTooLong: (value, maxLength) => value.length > maxLength,
};

const ERROR_MESSAGES = {
	isOnlySpaces: 'Task cannot consist only of spaces',
	isTooLong: (maxLength) => `Maximum length is ${maxLength} characters`,
};

const EditingTaskForm = (props) => {
	const { styles } = props;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState({ title: '', description: '' });

	const {
		editTask,
		newTaskTitleInputRef,
		selectedTask,
		setSelectedTask,
	} = useContext(TasksContext);

	useEffect(() => {
		if (selectedTask) {
			setTitle(selectedTask.title);
			setDescription(selectedTask.description);
		}
		else {
			setTitle('');
			setDescription('');
		}
	}, [selectedTask]);

	const isTitleEmpty = title.trim().length === 0;
	const hasError = error.title || error.description;

	const onSubmit = (event) => {
		event.preventDefault();
		if (!selectedTask) {
			return;
		}
		if (!isTitleEmpty && !hasError) {
			selectedTask.title = title.trim();
			selectedTask.description = description.trim();
			editTask(selectedTask, () => {
				setTitle('');
				setDescription('');
				setError({ title: '', description: '' });
				setSelectedTask(null);
				console.log(selectedTask);
			});
		}
	}

	const onInput = (fieldName) => (event) => {
		const { value } = event.target;
		const maxLength = MAX_LENGTH[fieldName];

		// Обновляем соответствующее состояние
		if (fieldName === 'title') {
			setTitle(value);
		} else {
			setDescription(value);
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
				className={styles.field}
				label="Title"
				id="edit-task-title"
				value={title}
				error={error.title}
				onInput={onInput("title")}
				ref={newTaskTitleInputRef}
			/>
			<Textarea
				className={styles.field}
				label="Description"
				id="edit-task-description"
				value={description}
				error={error.description}
				onInput={onInput("description")}
			/>
			<Button
				type="submit"
				isDisabled={isTitleEmpty || !!hasError}
			>
				Edit Task
			</Button>
		</form>
	)
}

export default EditingTaskForm;