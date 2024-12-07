import React, {useState, useRef} from 'react'
import Main from './Main.js'
import Header from './Header.js'
// import Footer from './Footer.js'

function App() {
	let width = 50;
	let height = 50;
	


	const mouseDownRef = useRef(false);
	const focusRef = useRef(['','']);

	const setStartOfScope = (e) => {
		if(e.button == 2){
		const ident = document.getElementById("cell-name");
		let nextFocus = [...focusRef.current];
		nextFocus[0] = e.target.id;
		focusRef.current = [...nextFocus];
		ident.value = focusRef.current[0];
		mouseDownRef.current = true;
		}
	}
	const  setEndOfScope = (e) => {
		if(mouseDownRef.current == true){
			const ident = document.getElementById("cell-name");
			let nextFocus = [...focusRef.current];
				console.log('1:' + nextFocus);
				console.log(e);
			nextFocus[1] = e.target.id;
			focusRef.current = [...nextFocus];
			ident.value = focusRef.current[0] + ":" + focusRef.current[1];
		console.log(focusRef.current);
		}
	}
	const setFinalEndOfScope = () => {
		let table = document.querySelectorAll(".cell");
		console.log(focusRef.current);
		mouseDownRef.current = false;
	}



	// обновление ячейки

	const cellChange = (e) => {
		const cellmonitor = document.getElementById('cell-value');
		cellmonitor.value= e.target.value;
	}
	const monitorChange = (e) => {
		const cellId = document.getElementById('cell-name').value;
		const cell = document.getElementById(cellId);
		cell.value = e.target.value;
	}

	// жирни шрифт

	const setBold = () => {
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.fontWeight==='bold'){
			cell.style.fontWeight='normal';
		} else {
			cell.style.fontWeight='bold';
		}

	}




	// кривой шрифт

	const setItalic = () => {
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.fontStyle==='italic'){
			cell.style.fontStyle='normal';
		} else {
			cell.style.fontStyle='italic';
		}
	}





	//шрифт на полу

	const setUnderlined = () => {
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.textDecoration==='underline'){
			cell.style.textDecoration='';
		} else{
			cell.style.textDecoration='underline';
		}

	}


//-------------------------------------------------



	return(
		<>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
				<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>

			</head>
			<Header setBold={setBold} setItalic={setItalic} setUnderlined={setUnderlined} monitorChange={monitorChange}/>
			<Main finalScope={setFinalEndOfScope} setEnd={setEndOfScope} setStart={setStartOfScope} height={height} width={width} onChangeCell={cellChange}/>
		</>
	)
}
export default App;
