import styles from './EditingWindow.module.scss'
import EditingTaskForm from '../../features/edit-task'
import { useContext } from 'react'
import { TasksContext } from "@/entities/todo";

const EditingWindow = () => {
	const { selectedTask } = useContext(TasksContext);

	if (!selectedTask) {
		return null;
	}

	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>Editing</h1>
			{/* <AddTaskForm styles={styles} /> */}
			<EditingTaskForm styles={styles} />
		</div >
	)
}

export default EditingWindow;