import { memo, useMemo, useContext } from "react";
import { TasksContext } from "@/entities/todo";

const TodoInfo = (props) => {
	const { styles } = props;

	const {
		tasks,
		deleteAllTasks,
	} = useContext(TasksContext);

	const total = tasks.length;
	const done = useMemo(() => {
		return tasks.filter(({ isDone }) => isDone).length;
	}, [tasks]);
	const hasTasks = total > 0;

	return (
		<div className={styles.info}>
			<div className={styles.totalTasks1}>
				Done {done} from {total}
			</div>
			{hasTasks &&
				<button
					className={styles.deleteAllButton}
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
