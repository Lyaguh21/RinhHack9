// import React, {useState} from 'react'
import Main from './Main.js'
import Header from './Header.js'
// import Footer from './Footer.js'

function App() {
	let width = 50;
	let height = 50;



	// выделение ячейки

	function setFocus(e) {
                const focus = document.getElementById('cell-name');              
		const cellmonitor = document.getElementById('cell-value');
		cellmonitor.value = e.target.value;
                focus.value = e.target.id;
        }




	// обновление ячейки

	function cellChange(e){
		const cellmonitor = document.getElementById('cell-value');
		cellmonitor.value= e.target.value;
		console.log(e);
	}
	function monitorChange(e){
		const cellId = document.getElementById('cell-name').value;
		const cell = document.getElementById(cellId);
		cell.value = e.target.value;
	}

	// жирни шрифт

	function setBold() {
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.fontWeight==='bold'){
			cell.style.fontWeight='normal';
		} else {
			cell.style.fontWeight='bold';
		}

	}




	// кривой шрифт

	function setItalic() {
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.fontStyle==='italic'){
			cell.style.fontStyle='normal';
		} else {
			cell.style.fontStyle='italic';
		}
	}





	//шрифт на полу

	function setUnderlined() {
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
			<Main height={height} width={width} onClick={setFocus} onChangeCell={cellChange}/>
		</>
	)
}
export default App;
