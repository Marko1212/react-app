import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';

function JournalList({ items, setItem }) {
	if (items.length === 0) {
		return <p>Pas de notes pour le moment, veuillez rajouter la première</p>;
	}

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		}
		return -1;
	};

	return (
		<>
			{items.sort(sortItems).map((el) => (
				<CardButton key={el.id} onClick={() => setItem(el)}>
					<JournalItem title={el.title} post={el.post} date={el.date} />
				</CardButton>
			))}
		</>
	);
}

export default JournalList;
