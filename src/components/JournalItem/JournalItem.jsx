import './JournalItem.css';

function JournalItem({ title, post, date } /* props */) {
	const formattedDate = new Intl.DateTimeFormat('fr-FR').format(date);
	/*   const title = 'Préparation au cours React';
  const date = new Date();
  const text = 'Ce texte contient plusieurs mots qui concernent React.'; */

	return (
		<>
			<h2 className='journal-item__header'>{title}</h2>
			<h2 className='journal-item__body'>
				<div className='journal-item__date'>
					{/* {date.toString()} */}
					{formattedDate}
				</div>
				<div className='journal-item__text'>{post}</div>
			</h2>
		</>
	);
}

export default JournalItem;
