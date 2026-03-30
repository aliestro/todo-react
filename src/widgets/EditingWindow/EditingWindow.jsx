import AddTaskForm from '@/features/add-task'

import Button from '@/shared/ui/Button'
import styles from '../Todo/Todo.module.scss'


const EditingWindow = () => {


	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>To Do List</h1>
			<AddTaskForm styles={styles} />
			<Button />
		</div >
	)
}

export default EditingWindow;