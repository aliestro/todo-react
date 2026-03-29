import { memo, useContext } from "react";
import { TasksContext } from "@/entities/todo";
import RouterLink from "@/shared/ui/RouterLink";
import styles from "./TodoItem.module.scss";
import { highlightCaseInsensitive } from "@/shared/utils/highlight";

const MAX_LENGTH = 22;

const ToDoItem = (props) => {
	const {
		className = '',
		id,
		title,
		isDone,
	} = props;

	const {
		firstIncopleteTaskRef,
		firstIncopleteTaskId,
		deleteTask,
		toggleTaskComplete,
		disapperingTaskId,
		apperingTaskId,
		searchQuery,
	} = useContext(TasksContext);

	const highlightedTitle = highlightCaseInsensitive(title, searchQuery);

	const getDisplayTitle = () => {
		if (highlightedTitle.length <= MAX_LENGTH) return highlightedTitle;

		// Удаляем HTML теги для подсчета
		const plainText = title;
		if (plainText.length <= MAX_LENGTH) return highlightedTitle;

		return plainText.slice(0, MAX_LENGTH) + '...';
	};

	return (<li
		className={`
			${styles.todoItem} 
			${className} 
			${disapperingTaskId === id ? styles.isDisappearing : ''}
			${apperingTaskId === id ? styles.isAppering : ''}
			`}
		ref={id === firstIncopleteTaskId ? firstIncopleteTaskRef : null}>
		<input
			className={styles.checkbox}
			id={id}
			type="checkbox"
			checked={isDone}
			onChange={({ target }) =>
				toggleTaskComplete(id, target.checked)
			}
		/>
		<label
			className={`${styles.label} visually-hidden`}
			htmlFor={id}
		>
			{title}
		</label>
		<RouterLink to={`tasks/${id}`} aria-label="Task detail page">
			{/* {title} */}
			<span
				dangerouslySetInnerHTML={{ __html: getDisplayTitle() }}
			/>
		</RouterLink>
		<button
			className={styles.deleteButton}
			aria-label="Delete"
			title="Delete"
			onClick={() => deleteTask(id)}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15 5L5 15M5 5L15 15"
					stroke="#757575"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	</li>)
}

export default memo(ToDoItem);
// export default ToDoItem;