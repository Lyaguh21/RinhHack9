function Cell (props) {

	return(

		<input type='text' id={props.id} className='cell' onKeyDown={props.onKeyDown} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp} onMouseEnter={props.onMouseEnter} onChange={props.onChange}></input>

	)

}

export default Cell;
