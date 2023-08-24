import { useEffect, useRef, useState } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';

function JournalForm({ onSubmit, data, onDelete }) {
	const INITIAL_VALIDATION_STATE = {
		title: true,
		post: true,
		date: true
	};
	
	const [formValidState, setFormValidState] = useState(INITIAL_VALIDATION_STATE);
	const [formValues, setFormValues] = useState(data);

	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		console.log(data);
		setFormValues(data);
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!formValidState.date || !formValidState.post || !formValidState.title) {
			focusError(formValidState);
			timerId = setTimeout(() => {
				console.log('Le state est effacé');
				setFormValidState(INITIAL_VALIDATION_STATE);
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);
	/* 	const [inputData, setInputData] = useState('');
	const [state, setState] = useState({
		age: 44
	});
	const [state2, setState2] = useState([1, 2, 3]);

	const inputChange = (event) => { */
	// console.log(event.target.value);
	/* 		setInputData(event.target.value);
		console.log(inputData);
	}; */

	const addJournalItem = (e) => {
		e.preventDefault();
		//	state.age = 49;
		//	state2.push(5);
		//	setState2([...state2]);
		//	console.log(state);
		//	setState({ ...state }); // spread operator to be used! same for arrays!
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;
		if (!formProps.title.trim().length) {
			setFormValidState((state) => ({ ...state, title: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, title: true }));
		}
		if (!formProps.post.trim().length) {
			setFormValidState((state) => ({ ...state, post: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, post: true }));
		}
		if (!formProps.date) {
			setFormValidState((state) => ({ ...state, date: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, date: true }));
		}
		if (!isFormValid) {
			return;
		}
		// console.log(formProps);
		// onSubmit(formProps);
		onSubmit(formValues);
		setFormValues({
			id: '',
			title: '',
			post: '',
			date: '',
			tag: ''
		});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		/* 		setFormValues({
			id: '',
			title: '',
			post: '',
			date: '',
			tag: ''
		}); */
	};

	const onChange = (e) => {
		setFormValues((prev) => ({...prev, [e.target.name]: e.target.value} ));
	};

	return (
		<form
			className={styles['journal-form']}
			/* 'journal-form' */ onSubmit={addJournalItem}
		>
			{/* 	{state.age} {state2.length} */}
			<div className={styles['form-row']}>
				<input
					type='text'
					name='title'
					value={formValues.title}
					onChange={onChange}
					ref={titleRef}
					className={
						cn(styles['input-title'], {
							[styles.invalid]: !formValidState.title
						}) /* `${styles.input} ${
					formValidState.title ? '' : styles.invalid
				}` */
					}
					/* style={{ border: formValidState.title ? undefined : '1px solid red' }} */
				/>
				{ data.id && <button className={styles['delete']} type="button"><img src="/archive.svg" alt="Bouton effacer" onClick={deleteJournalItem} /></button> }
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Icône du calendrier' />
					<span>Date</span>
				</label>
				<input
					type='date'
					value={formValues.date ? new Date(formValues.date).toISOString().slice(0, 10) : ''}
					ref={dateRef}
					name='date'
					onChange={onChange}
					id='date'
					className={`${styles.input} ${
						formValidState.date ? '' : /* 'invalid' */ styles.invalid
					}`}
					/* style={{ border: formValidState.date ? undefined : '1px solid red' }} */
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Icône des tags' />
					<span>Tags</span>
				</label>
				<input type='text' value={formValues.tag} onChange={onChange} name='tag' id='tag' className={styles.input} />
			</div>
			{/* <input type='text' name='tag' value={inputData} onChange={inputChange} /> */}
			<textarea
				name='post'
				id='post'
				value={formValues.post}
				onChange={onChange}
				ref={postRef}
				cols='30'
				rows='10'
				className={`${styles.input} ${
					formValidState.post ? '' : styles.invalid
				}`}
				/* style={{ border: formValidState.post ? undefined : '1px solid red' }} */
			></textarea>
			<Button
				text='Enregistrer'
				/* onClick={() => console.log('Click sur bouton')} */
			/>
		</form>
	);
}

export default JournalForm;
