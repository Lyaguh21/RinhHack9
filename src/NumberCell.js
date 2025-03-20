function NumberCell(props) {
	return( 
		<div className='number-cell' id={props.id} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp} onMouseEnter={props.onMouseEnter} >{props.id}</div>
	)
}

export default NumberCell;
