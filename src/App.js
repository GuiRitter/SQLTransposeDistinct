import React, { useEffect, useRef } from 'react';

import './App.css';

function componentDidMount(props) {
	document.body.classList.add('container');
}

function App(props) {

	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});

	return <><textarea className='input' id='input' /><textarea className='output' id='output' /><input className='button' onClick={() => {
		let input = document.getElementById("input");

		let rowList = input.value.split('\n');

		let header = rowList[0].split('\t');

		rowList = rowList.slice(1);

		let map = {};
		let cellList = [];

		rowList.forEach(row => {

			cellList = row.split('\t');

			header.forEach((column, index) => map[column] = (map[column] || []).concat(cellList[index] * 1));
		});

		Object.keys(map).forEach(key => {

			map[key] = map[key].reduce((previous, current) => previous.includes(current) ? previous : previous.concat(current), []).sort();

			map[key] = `(${map[key].join(', ')})`;
		});

		let output = document.getElementById("output");

		output.value = JSON.stringify(map);

	}} type='button' value='transpose and remove duplicates' /></>;
}

export default App;
