
import { TasksProvider } from "@/entities/todo";
import Todo from "@/widgets/Todo";
import EditingWindow from "@/widgets/EditingWindow";
import './TasksPageStyles.module.scss'

const TasksPage = () => {
	return (
		<TasksProvider>
			<main>
				<Todo />
				<EditingWindow />
			</main>
		</TasksProvider>
	)
}

export default TasksPage;