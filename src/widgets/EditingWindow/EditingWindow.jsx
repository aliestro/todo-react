import AddTaskForm from '@/features/add-task'

import Button from '@/shared/ui/Button'
import styles from './EditingWindow.module.scss'
import EditingTaskForm from '../../features/edit-task'


const EditingWindow = () => {


	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>Editing</h1>
			{/* <AddTaskForm styles={styles} /> */}
			<EditingTaskForm styles={styles} />
		</div >
	)
}

export default EditingWindow;