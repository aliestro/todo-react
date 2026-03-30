import styles from './Field.module.scss'
const Field = (props) => {
	const {
		className = '',
		id,
		label,
		type = 'text',
		onInput,
		value,
		ref,
		error,
	} = props;

	// console.log(className);

	return (
		<div className={`${styles.field} ${className}`}>
			<label
				className={styles.label}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className={`${styles.input} ${error ? styles.isInvalid : ''}`}
				id={id}
				placeholder=" "
				autoComplete="off"
				type={type}
				value={value}
				onInput={onInput}
				ref={ref}
			/>
			{error && <div className={styles.error} title={error}>{error}</div>}
		</div>
	)
}

export default Field