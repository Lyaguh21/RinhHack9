import React, {useState} from 'react'
function Main(props){
	
	
	// алфавит  для букавок

	const al = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'];


	// из индекса таблицы(типо "Б8") делает масивчик с индексами этой ячейки в массиве tableElements(типо "[2, 8]")
	
	function indexConvert(tableIndex){
		let normIndex = ['0', '0'];	
		if(al.includes(tableIndex[1])){
			if(al.includes(tableIndex[2])){
				normIndex[0] = ((parseInt(al.indexOf(tableIndex[0])) + 1)*(al.length * al.length) + (parseInt(al.indexOf(tableIndex[1])) + 1)*al.length + (parseInt(al.indexOf(tableIndex[2])))).toString();
				normIndex[1] = (parseInt(tableIndex.slice(3))).toString();
				return(normIndex);
			}
			normIndex[0] = ((parseInt(al.indexOf(tableIndex[0])) +1) * al.length + (parseInt(al.indexOf(tableIndex[1] + 1)))).toString();
			normIndex[1] = (parseInt(tableIndex.slice(2))).toString();

			return(normIndex);
		}
		normIndex[0] = (parseInt(al.indexOf(tableIndex[0])) +1).toString();
		normIndex[1] = (parseInt(tableIndex.slice(1))).toString();
		return(normIndex);
	}
	

	// из нормального массивчика с индексами делает табличный формат, как предыдушая функция, только наоборот короче
	
	function indexTabler(normIndex){
		let tableIndex = "";
		if(normIndex[0] > al.length * al.length){
			tableIndex= (~~(al[parseInt(normIndex[0]) / (al.length * al.length) - 1])).toString() + (~~(al[parseInt(normIndex[0]) % (al.length * al.length) / al.length - 1])).toString() + (al[parseInt(normIndex[0]) % (al.length * al.length) % al.length - 1]).toString() + normIndex[1];
			return(tableIndex);
		}
		if(normIndex[0] > al.length){
			tableIndex = (~~(al[parseInt(normIndex[0]) / al.length - 1])).toString() + (al[parseInt(normIndex[0]) % al.length - 1]).toString() + normIndex[1];
			return(tableIndex);
		}
		tableIndex = al[parseInt(normIndex[0]) - 1] + normIndex[1];
		return(tableIndex);
	}

	//пока не уверен в нужности этого 
	let tableList = [];  
	for(let i=0; i<props.width; i++){
		tableList[i]= [];
	}


	//масивчик с ячейками
	
	let tableElements = [];

	// пока не работает
	
	function setCell(e){
		tableList[indexConvert(e.target.id)[0]][indexConvert(e.target.id)[1]] = e.target.value;		
		console.log(tableList);
	}


	//шаблон ячейки
	var cell = "<input type='text' class='cell'></input>";
	cell = cell.repeat(props.height * props.width);


	// поиск ячеек
	
	window.onload = function(){
		tableElements = document.querySelectorAll('input');
		for(let i = 0; i< props.width; i++){
			tableList[i] = [];
			for(let j = 0; j < props.height; j++){
				tableElements.item(i*props.width + j).id=indexTabler([i+1,j+1]);
				tableElements.item(i*props.width + j).onChange=(event)=>{setCell(event)};
				tableList[i][j] = tableElements.item(i*props.width + j).id; 
			}
		}
	};


	//html фрагментик
	return(
		<div id="table"	dangerouslySetInnerHTML={{__html: cell}}> 	
		</div>
	)
}
export default Main;
