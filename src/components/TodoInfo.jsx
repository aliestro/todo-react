import { memo, useMemo, useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const TodoInfo = () => {
	const {
		tasks,
		deleteAllTasks,
	} = useContext(TasksContext);

	const total = tasks.length;
	const done = useMemo(() => {
		return tasks.filter(({ isDone }) => isDone).length;
	}, [tasks]);
	const hasTasks = total > 0;

	// console.log('done', done);

	return (
		<div className="todo__info">
			<div className="todo__total-tasks">
				Done {done} from {total}
			</div>
			{hasTasks &&
				<button
					className="todo__delete-all-button"
					type="button"
					onClick={deleteAllTasks}
				>
					Delete all
				</button>
			}
		</div>
	)
}

export default memo(TodoInfo);