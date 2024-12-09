import React, {useState, useRef} from 'react'
import Main from './Main.js'
import Header from './Header.js'
// import Footer from './Footer.js'

function App() {
	const al = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'];
	let width = 50;
	let height = 50;
	console.log(indexConvert('АА10'));
	console.log(indexConvert('АР10'));

	function numToLet(num){
                let letter ='';
                if( num>al.length*al.length){
                        let firstIndex = (~~(num / (al.length * al.length)));
                        num -= firstIndex * al.length * al.length;
                        let secondIndex = (~~(num / al.length));
                        num -= secondIndex * al.length;
                        let thirdIndex = num;
                        letter = al[firstIndex - 1] + al[secondIndex - 1] + al[thirdIndex - 1];
                } else if(num> al.length){
                        let firstIndex = (~~(num / al.length)); 
                        num -= firstIndex * al.length;
                        let secondIndex = num;
                        letter = al[firstIndex - 1] + al[secondIndex - 1];
                } else {
                        letter = al[num - 1]
                }
                return(letter);
        }

	function rangeToArray(focus){
		if(focusRef.current[1] === ''){
			focusRef.current[1] = focusRef.current[0];
		}
		let start = indexConvert(focus[0]);
		let end = indexConvert(focus[1]);
		let array = [];	
		let rowStart = Math.min(Number(start[1]), Number(end[1]));
		let rowEnd = Math.max(Number(start[1]), Number(end[1]));
		let columnStart = Math.min(Number(start[0]), Number(end[0]));
		let columnEnd = Math.max(Number(start[0]), Number(end[0]));
		for(let r = rowStart; r<=rowEnd; r++){
			for(let c = columnStart; c<=columnEnd; c++){
				array.push(tableRef.current[r-1][c-1]);
			}
		}
		return(array);
	}
	function indexConvert(tableIndex){
                let normIndex = ['0', '0'];
                if(al.includes(tableIndex[1])){
                        if(al.includes(tableIndex[2])){
                                normIndex[0] = ((parseInt(al.indexOf(tableIndex[0])) + 1)*(al.length * al.length) + (parseInt(al.indexOf(tableIndex[1])) + 1)*al.length + (parseInt(al.indexOf(tableIndex[2])))).toString();
                                normIndex[1] = (parseInt(tableIndex.slice(3))).toString();
                                return(normIndex);
                        }
                        normIndex[0] = ((al.indexOf(tableIndex[0]) +1) * al.length + (al.indexOf(tableIndex[1]) + 1)).toString();
                        normIndex[1] = (parseInt(tableIndex.slice(2))).toString();

                        return(normIndex);
                }
                normIndex[0] = (parseInt(al.indexOf(tableIndex[0])) +1).toString();
                normIndex[1] = (parseInt(tableIndex.slice(1))).toString();
                return(normIndex);
	}
	

	const mouseDownRef = useRef(false);
	const focusRef = useRef(['','']);
	const tableRef = useRef([]);


	const resetSelection = () => {
		rangeToArray(focusRef.current).forEach((target) => {target.className = 'cell'});
	}
	const setSelection = () => {
		rangeToArray(focusRef.current).forEach((target) => {target.className = 'cell selected'});
	}
	const setStartOfScope = (e) => {
		if(e.target.className === 'cell' || e.target.className === 'cell selected'){
			resetSelection();
			const ident = document.getElementById("cell-name");
			focusRef.current = [e.target.id, ''];
			ident.value = focusRef.current[0];
			setSelection();
			if(e.button === 2){
			mouseDownRef.current = true;
			}
		} else {
			resetSelection();
			const ident = document.getElementById("cell-name");
			if (e.target.className === 'number-cell'){
				focusRef.current = ['А' + `${e.target.innerHTML}`, `${numToLet(width) + e.target.innerHTML}`];
			} else {
			focusRef.current = [`${e.target.id + '1'}`, `${e.target.id + height}`];
			}
			ident.value = focusRef.current[0] + ':' + focusRef.current[1];
			setSelection();
			if(e.button === 2){
				mouseDownRef.current = true;
			
			}
		}
	}
	const  setEndOfScope = (e) => {
		if(mouseDownRef.current === true){
			resetSelection();
			const ident = document.getElementById("cell-name");
			if(e.target.className === 'cell' || e.target.className === 'cell selected'){
				focusRef.current = [focusRef.current[0], e.target.id];
			} else if ( e.target.className === 'number-cell'){
				focusRef.current = [focusRef.current[0], `${numToLet(width) + e.target.innerHTML}`];
			} else {
				focusRef.current = [focusRef.current[0], `${e.target.id + height}`];
			}
			ident.value = focusRef.current[0] + ':' + focusRef.current[1];
			setSelection();
		}
	}
	const setFinalEndOfScope = () => {
		mouseDownRef.current = false;
	}



	// обновление ячейки

	const cellChange = (e) => {
		const cellmonitor = document.getElementById('cell-value');
		cellmonitor.value= e.target.value;
		monitorChange(e);
	}
	const monitorChange = (e) => {
		if(focusRef.current[1] === ''){
		const cellId = document.getElementById('cell-name').value;
		const cell = document.getElementById(cellId);
		cell.value = e.target.value;
		} else{
			const targets = rangeToArray(focusRef.current);
			targets.forEach((target) => {target.value = e.target.value;});
		}
	}

	// жирни шрифт

	const setBold = () => {
		if(focusRef.current[1] === ''){
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.fontWeight==='bold'){
			cell.style.fontWeight='normal';
		} else {
			cell.style.fontWeight='bold';
		}
		} else {
			const targets = rangeToArray(focusRef.current);
			if(targets[0].style.fontWeight ==='bold'){
				targets.forEach((target) => {target.style.fontWeight = 'normal';});
			} else {
				targets.forEach((target) => {target.style.fontWeight = 'bold'});
			}
		}

	}




	// кривой шрифт

	const setItalic = () => {
		if(focusRef.current[1] === ''){
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.fontStyle==='italic'){
			cell.style.fontStyle='normal';
		} else {
			cell.style.fontStyle='italic';
		}
		} else{
			let targets = rangeToArray(focusRef.current);
			if(targets[0].style.fontStyle === 'italic'){
				targets.forEach((target) => {target.style.fontStyle = 'normal';});
			} else {
				targets.forEach((target) => {target.style.fontStyle = 'italic';});
			}
		}
	}





	//шрифт на полу

	const setUnderlined = () => {
		if(focusRef.current[1] === ''){
		const focus = document.getElementById('cell-name');
		const cell = document.getElementById(focus.value);
		if(cell.style.textDecoration==='underline'){
			cell.style.textDecoration='';
		} else{
			cell.style.textDecoration='underline';
		}
		} else {
			const targets = rangeToArray(focusRef.current);
			if(targets[0].style.textDecoration==='underline'){
				targets.forEach((target) => {target.style.textDecoration = '';});
			} else {
				targets.forEach((target) => {target.style.textDecoration = 'underline';});
			}

		}

	}


//-------------------------------------------------



	return(
		<>
			<Header setBold={setBold} setItalic={setItalic} setUnderlined={setUnderlined} monitorChange={monitorChange}/>
			<Main tableRef={tableRef} finalScope={setFinalEndOfScope} setEnd={setEndOfScope} setStart={setStartOfScope} height={height} width={width} onChangeCell={cellChange}/>
		</>
	)
}
export default App;
