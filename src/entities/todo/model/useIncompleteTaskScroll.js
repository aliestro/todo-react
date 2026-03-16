import { useRef } from "react";

const useIncompleteTaskScroll = (tasks) => {
	const firstIncopleteTaskRef = useRef(null);
	const firstIncopleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

	return {
		firstIncopleteTaskRef,
		firstIncopleteTaskId
	}
}

export default useIncompleteTaskScroll;