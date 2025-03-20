function ColumnHead (props) {

	return (

		<div id={props.id} className='column-head' onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onMouseUp={props.onMouseUp}>{props.id}</div>

	)

}

export default ColumnHead;

