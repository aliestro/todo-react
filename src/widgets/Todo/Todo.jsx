import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import TodoInfo from '@/features/stats'

import { TasksContext } from '@/entities/todo'
import { useContext } from 'react'
import Button from '@/shared/ui/Button'
import styles from './Todo.module.scss'
import { TodoList } from '@/entities/todo'

const Todo = () => {
	const { firstIncopleteTaskRef } = useContext(TasksContext);

	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>To Do List</h1>
			<AddTaskForm styles={styles} />
			<SearchTaskForm styles={styles} />
			<TodoInfo styles={styles} />
			<Button onClick={() => { firstIncopleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' }) }}>
				Show first incomplete task
			</Button>
			<TodoList styles={styles} />
		</div >
	)
}

export default Todo;