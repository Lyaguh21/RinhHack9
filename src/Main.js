import ColumnHead from './ColumnHead.js';
import Cell from './Cell.js';
import React, {useEffect, useRef, useState} from 'react';
import NumberCell from './NumberCell.js';


function Main(props) {
	

	const [tableState, setTableState] = useState([]);
	const tableRef = useRef([]);
	useEffect(() => {
		setTable();
	}, []);
	useEffect(() => {
		setTable();
	}, [props.width, props.height]);
	useEffect(() => {
		props.setTableRef();
	}, [tableState]);


	const setTable = () => {
		tableRef.current = [];
		tableRef.current.push( {type: 'none' } );
		for ( let i = 1 ; i <= props.width; i++ ) {
			tableRef.current.push({type: 'head', id: props.numToLet(i)});
		}	
		for ( let i = 1 ; i <=props.height ; i++ ) {
			tableRef.current.push({type: 'number', id: i.toString()});
			for ( let j = 1 ; j <= props.width ; j++ ) {
				tableRef.current.push({type: 'cell', id: [j, i]});
			}
		}
		setTableState( tableRef.current.map((item) => {
			if(item.type === 'head'){
				return( <ColumnHead key={item.id} onMouseDown={props.setStart} onMouseUp={props.finalScope} onMouseEnter={props.setEnd} id={item.id} />)
			} else if(item.type === 'number') {
				return( <NumberCell key={item.id} id={item.id.toString()} onMouseUp={props.finalScope} onMouseDown={props.setStart} onMouseEnter={props.setEnd} />)
			} else if(item.type === 'none') {
				return( <div key={'none'} className='column-head'></div> )
			} else if ( item.type === 'cell' ) {
				return( <Cell key={indexTabler(item.id)} onKeyDown={props.nextCell} onMouseDown={props.setStart} onMouseUp={props.finalScope} onMouseEnter={props.setEnd} onChange={props.onChangeCell} id={indexTabler(item.id)} /> )
			}
			return(undefined);
			
			}));

	}
	
	// алфавит  для букавок

	const al = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'];


	// из индекса таблицы(типо "Б8") делает масивчик с индексами этой ячейки в массиве tableElements(типо "[2, 8]")


	// из нормального массивчика с индексами делает табличный формат, как предыдушая функция, только наоборот короче
	
	function indexTabler(normIndex){
		let tableIndex = "";
		if(normIndex[0] > al.length * al.length){
			tableIndex= (~~(al[parseInt(normIndex[0]) / (al.length * al.length) - 1])).toString() + (~~(al[parseInt(normIndex[0]) % (al.length * al.length) / al.length - 1])).toString() + (al[parseInt(normIndex[0]) % (al.length * al.length) % al.length - 1]).toString() + normIndex[1];
			return(tableIndex);
		}
		if(normIndex[0] > al.length){
			tableIndex = al[(~~((parseInt(normIndex[0]) - 1) / al.length))] + al[parseInt(normIndex[0]) - ((~~((parseInt(normIndex[0]) - 1) / al.length)) * al.length)] + normIndex[1];
			return(tableIndex);
		}
		tableIndex = al[parseInt(normIndex[0]) - 1] + normIndex[1];
		return(tableIndex);
	}

	let fonts = require('./data/fonts.json');

	// поиск ячеек
	window.onload = function(){
		document.documentElement.style.setProperty('--table-width', props.width);
		document.documentElement.style.setProperty('--table-height', props.height);
		document.getElementById('font').addEventListener('click', props.fontDropDown);
		const  fontDropDown = document.getElementById('font-dropdown');
		fontDropDown.addEventListener('mouseleave', props.fontClose);
		fonts.fonts.forEach((font) => {
			fontDropDown.insertAdjacentHTML('afterbegin', `<div class='font' style="font-family: ${font.css}">${font.name}</div>`);
		});
		document.addEventListener('contextmenu', e => e.preventDefault())
		const fontChanger = document.querySelectorAll('.font');
		fontChanger.forEach((item) => {item.addEventListener('click', (e) => props.fontChange(e))});
		document.body.addEventListener('keydown', (e) => props.hotKeys(e));
	}	
	
	 let style = {
		 '--table-height': props.height,
		 '--table-width': props.width
	 }

	return(
		<>
			<div id="table" style={style}> {tableState} </div>
		</>
	)
}
export default Main;
