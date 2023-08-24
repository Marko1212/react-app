import './Button.css';

function Button({ text, onClick }) {
	// let text = 'Enregistrer';
	/* const [text, setText] = useState('Enregistrer');
	console.log(text); */ // après click : Fermer
	/* 
	const clicked = () => { */
	//	text = 'Fermer';
	//		setText('Fermer');
	/* setText((t) => t + '!'); */
	//	console.log('Salut!');
	/* console.log(text); */ // Enregistrer
	/* 	};
	 */
	return (
		<button
			/* onClick={clicked}  */ className='button accent'
			onClick={onClick}
		>
			{text}
		</button>
	);
}

export default Button;
