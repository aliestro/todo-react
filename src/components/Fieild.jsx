const Field = () => {
	return (
		<div className="field">
			<label
				className="field__label"
				htmlFor="new-task"
			>
				New task
			</label>
			<input
				className="field__input"
				id="new-task"
				placeholder=" "
				autoComplete="off"
			/>
		</div>
	)
}

export default Field