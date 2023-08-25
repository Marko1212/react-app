import { useEffect, useState } from 'react';
import './App.css';
// import Button from './components/Button/Button';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/body/Body';
import LeftPanel from './layouts/leftPanel/leftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';

function App() {
	const INITIAL_DATA = [
		/* 		{
			id: 1,
			title: 'Préparation au cours React',
			post: 'Ce texte contient plusieurs mots qui concernent React.',
			date: new Date()
		},
		{
			id: 2,
			title: 'Préparation au cours Typescript',
			post: 'Ce texte contient plusieurs mots qui concernent TypeScript.',
			date: new Date()
		} */
	];
	const INITIAL_SELECTED_ITEM={
		id: '',
		title: '',
		post: '',
		date: '',
		tag: ''
	};

	//	const [items, setItems] = useState(INITIAL_DATA);
	const [items, setItems] = useLocalStorage('data');

	const [selectedItem, setSelectedItem] = useState(INITIAL_SELECTED_ITEM);

	/* 	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			console.log('get items from localStorage'); */ // fait 2 fois parce que régime strict en mode dev
	/* 			setItems(
				data.map((item) => ({
					...item,
					date: new Date(item.date)
				}))
			);
		}
	}, []); */

	/* useEffect( */
	/* () => console.log(items) */
	/* 		() => {
			if (items.length) {
				console.log('enregistrement');
				localStorage.setItem('data', JSON.stringify(items));
			}
		},
		[items]
	); */

	// API call => items are updated, state is updated, so another render occurs
	// then another API call => items are again updated, state is updated, so another render occurs
	// and so on - infinite loop occurs
	// to prevent this, useEffect hook is necessary

	function mapItems(items) {
		if (!items) {
			return [];
		}
		return items.map(i => ({
			...i,
			date: new Date(i.date)
		}));
	}

	const addItem = (item) => {
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items?.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
			/* 			setItems((oldItems) => [
				...oldItems,
				{
					...item,
					date: new Date(item.date),
					id:
					oldItems.length > 0
						? Math.max(...oldItems.map((item) => item.id)) + 1
						: 1
				}
			]);  */
		} else 
		{
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		
			/* 		setItems((oldItems) => [
			...oldItems.map(i => {
				if (i.id === item.id) {
					return {
						...item,
						date: new Date(item.date)
					};
				}
				return i;
			})
		]); */
		}
	//	setSelectedItem(INITIAL_SELECTED_ITEM); // clear form
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
		setSelectedItem(INITIAL_SELECTED_ITEM); // clear form
	};

	/* 	const [inputData, setInputData] = useState('');

	const inputChange = (event) => {
		// console.log(event.target.value);
		setInputData(event.target.value);
		console.log(inputData);
	}; */
	// return React.createElement('div', {}, 'Projet');
	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton clearForm={() => setSelectedItem(INITIAL_SELECTED_ITEM)} />
				<JournalList /* items={items} */ items={mapItems(items)} setItem={setSelectedItem} />
				{/* 	{[<Button></Button>, <Button></Button>]} */}
				{/* 		{items.length === 0 && (
						<p>Pas de notes pour le moment, veuillez rajouter la première</p>
					)} */}
				{/* 	{list} */}
				{/* 					<CardButton>
						<JournalItem
							title={data[0].title}
							post={data[0].post}
							date={data[0].date}
						/>
					</CardButton>
					<CardButton>
						<JournalItem
							title={data[1].title}
							post={data[1].post}
							date={data[1].date}
						/>
					</CardButton> */}
				{/* </JournalList> */}
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} data={selectedItem} onDelete={deleteItem} />
				{/* 	<input type='text' value={inputData} onChange={inputChange} /> */}
			</Body>
			{/* 			<h1>Titre du texte</h1>
			<p>Texte</p>
			<Button /> */}
			{/* 			<CardButton>
				<JournalItem
					title={data[0].title}
					post={data[0].post}
					date={data[0].date}
				/>
			</CardButton>
			<CardButton>
				<JournalItem
					title={data[1].title}
					post={data[1].post}
					date={data[1].date}
				/>
			</CardButton> */}
		</div>
	);
}

export default App;
