import React, {useState} from 'react'
function Main(props){
	const al = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'];
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
	let tableList = [];  
	for(let i=0; i<props.width; i++){
		tableList[i]= [];
	}
	let tableElements = [];
	function setCell(e){
		tableList[indexConvert(e.target.id)[0]][indexConvert(e.target.id)[1]] = e.target.value;		
		console.log(tableList);
	}

	var cell = "<input type='text' class='cell'></input>";
	cell = cell.repeat(props.height * props.width);
	window.onload = function(){
		tableElements = document.querySelectorAll('input');
		for(let i = 0; i< props.width; i++){
			tableList[i] = [];
			for(let j = 0; j < props.height; j++){
				tableElements.item(i*props.width + j).id=indexTabler([i+1,j+1]);
				tableElements.item(i*props.width + j).onChange=(event)=>{setCell(event)};
				tableList[i][j] = tableElements.item(i*props.width + j).id; 
				console.log(i*props.width+j);
			}
		}
		console.log(tableList);
	};

	return(
		<div id="table"	dangerouslySetInnerHTML={{__html: cell}}> 	
		</div>
	)
}
export default Main;
