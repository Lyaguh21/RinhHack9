function Main(props) {
	
	
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
			tableIndex = al[(~~(parseInt(normIndex[0]) / al.length)) - 1] + (al[parseInt(normIndex[0]) % al.length - 1]).toString() + normIndex[1];
			return(tableIndex);
		}
		tableIndex = al[parseInt(normIndex[0]) - 1] + normIndex[1];
		return(tableIndex);
	}
	


	//масивчик с ячейками
	
	let tableElements = [];

	// пока не работает
	
	var cell = `<input type='text' class='cell'>`;
	cell = cell.repeat(props.width * props.width);
	

	//заголовки столбцов
	
	let ColumnHead = "<div class='column-head'></div>";
	let HeadRow = ColumnHead.repeat(props.width +1); 


	let NumberCell = "<div class='number-cell'></div>";


	// поиск ячеек
	window.onload = function(){
		document.addEventListener('contextmenu', e => e.preventDefault())
		let alo = document.getElementById("table");
		alo.insertAdjacentHTML('afterbegin', HeadRow);
		let Head = document.querySelectorAll('.column-head')

		for(let i = 0; i<props.width; i++){
			if(i >= al.length){
				Head.item(i+1).innerHTML = al[(~~(i / al.length))-1] + al[i%al.length];
				Head.item(i+1).id = al[(~~(i / al.length))-1] + al[i%al.length];
			}else{ 
				Head.item(i+1).innerHTML = al[i];	
				Head.item(i+1).id = al[i];	
			}

		}

		tableElements = document.querySelectorAll('.cell');
		for(let i = 0; i<props.height; i++){
			tableElements.item(i*props.width).insertAdjacentHTML('beforebegin', NumberCell);
		}
		let numbers = document.querySelectorAll('.number-cell');
		for(let i = 0; i< props.height; i++){
			numbers.item(i).innerHTML=i+1;
		}		
		Head.forEach((target) => {
			if(target.innerHTML){
				target.addEventListener("mousedown", (e) => props.setStart(e));
				target.addEventListener("mouseover", (e) => props.setEnd(e));
				target.addEventListener("mouseup", (e) => props.finalScope(e))
			}
		});
		numbers.forEach((target) => {
				target.addEventListener("mousedown", (e) => props.setStart(e));
				target.addEventListener("mouseover", (e) => props.setEnd(e));
				target.addEventListener("mouseup", (e) => props.finalScope(e))
		});
		tableElements.forEach((cell) => {
			cell.addEventListener("mousedown", (e) => props.setStart(e))
			cell.addEventListener("mouseup", (e) => props.finalScope(e))
			cell.addEventListener("input", (e) => props.onChangeCell(e))
			cell.addEventListener("mouseover", (e) => props.setEnd(e))
		});
		for(let i = 0; i<props.height;i++){
                        props.tableRef.current[i] = [];
                        for(let j = 0; j<props.width;j++){
                                props.tableRef.current[i][j] = tableElements.item(i*props.width + j);
                        }
                }
		for(let i = 0; i< props.width; i++){
			for(let j = 0; j < props.height; j++){
				tableElements.item(i*props.width + j).id=indexTabler([j+1,i+1]);
			}
		}

	}	
	
	 	 

	//html фрагментик
	return(
		<>
			<div id="table"	dangerouslySetInnerHTML={{__html: cell}}></div>
		</>
	)
}
export default Main;
