import styles from './Textarea.module.scss'
const Textarea = (props) => {
	const {
		className = '',
		id,
		label,
		onInput,
		maxLength,
		value,
		error,
	} = props;

	return (
		// <div className={`${styles.field} ${className}`}>
		// 	<label
		// 		className={styles.label}
		// 		htmlFor={id}
		// 	>
		// 		{label}
		// 	</label>
		// 	<input
		// 		className={`${styles.input} ${error ? styles.isInvalid : ''}`}
		// 		id={id}
		// 		placeholder=" "
		// 		autoComplete="off"
		// 		type={type}
		// 		value={value}
		// 		onInput={onInput}
		// 		ref={ref}
		// 	/>
		// 	{error && <div className={styles.error} title={error}>{error}</div>}
		// </div>
		<div className={`${styles.field} ${className}`}>
			<label
				className={styles.label}
				htmlFor={id}
			>
				{label}
			</label>
			<textarea
				className={`${styles.textarea} ${error ? styles.isInvalid : ''}`}
				id={id}
				onInput={onInput}
				placeholder=" "
				autoComplete="off"
				maxLength={maxLength}
				value={value}
			/>
			{error && <div className={styles.error} title={error}>{error}</div>}
		</div>
	)
}

export default Textarea