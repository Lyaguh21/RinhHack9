import undo from "./images/arrow_left.png";
import logo2 from "./images/logo2.png";
import paste from "./images/paste.png";
import func from "./images/func.png";
import bold from "./images/bold.svg";
import cursiv from "./images/cursiv.svg";
import underline from "./images/underline.svg";
function Header(props) {
	 
	const enter = (e) => {
		if(e.key === 'Enter'){
			const monitor = document.getElementById('cell-value');
			monitor.focus();
		}
	}
	return(
		<header>
			<img id="logo" src={logo2} alt="logo_image"/>
			<div className="flex-box">
				<div className="button">Файл</div>
				<div className="button">Формулы</div>
				<div className="button">Справка</div>
			</div>
		<div id="name">FormulaFlex</div>
		<div className="toolPanel">
		<div id="redo"><img src={undo} alt="hui"></img></div>
		<div id="undo"><img src={undo} alt="arrow"></img></div>
		<div id="paste"><img src={paste} alt="paste"></img></div>
		<div id="font-bar">
			<div id="font">
			</div>
			<div id="font-size"></div>
		</div>
		<div id="font-styles">
			<div id="bold" onClick={props.setBold}><img src={bold} alt="bold"  ></img></div>
			<div id="cursiv" onClick={props.setItalic}><img src={cursiv} alt="cursiv"></img></div>
			<div id="underline" onClick={props.setUnderlined}><img src={underline} alt="underline"></img></div>
		</div>
		<div id="func"><img src={func} alt="func"></img></div>
		<input type="number" min='1' placeholder="Высота" id="height" onKeyDown={props.toWidth}></input>
		<input type="number" min='1' placeholder="Ширина" id="width" onKeyDown={props.setSizeFromWidth}></input>
		<button id="sizeSetter" onClick={props.setSize}>задать</button>
		</div>
		<div className="bottom-panel">
			<input type="text" placeholder="номер ячейки" id="cell-name" onKeyPress={enter} onChange={props.monitorChange2}></input>
			<input type="text" placeholder="значение ячейки" id="cell-value" onChange={props.monitorChange}></input>
		</div>
		<div id="font-dropdown"></div>
		</header>
	);
}
export default Header;
