function Main(props){
	var cell = "<input type='text' class='cell'></input>";
	cell = cell.repeat(props.height * props.width);
	console.log(props.height, props.width)
	return(
		<div id="table"	dangerouslySetInnerHTML={{__html: cell}}> 	
		</div>
	)
}
export default Main;
