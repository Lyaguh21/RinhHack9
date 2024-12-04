import undo from "./arrow_left.png";
import logo2 from "./logo2.png";
import paste from "./paste.png";
import func from "./func.png";
import bold from "./bold.svg";
import cursiv from "./cursiv.svg";
import underline from "./underline.svg";
function Header(props) {
	return(
		<header>
			<img id="logo" src={logo2} alt="logo_image"/>
			<div className="flex-box">
				<div className="button">Файл</div>
				<div className="button" id="vid">Вид</div>
				<div className="button">Формулы</div>
				<div className="button">Справка</div>
			</div>
		<div id="name">FormulaFlex</div>
		<div className="toolPanel">
		<div id="redo"><img src={undo} alt="hui"></img></div>
		<div id="undo"><img src={undo} alt="arrow"></img></div>
		<div id="paste"><img src={paste} alt="paste"></img></div>
		<div id="font-bar">
			<div id="font"></div>
			<div id="font-size"></div>
		</div>
		<div id="font-styles">
			<div id="bold" onClick={props.setBold}><img src={bold} alt="bold"  ></img></div>
			<div id="cursiv" onClick={props.setItalic}><img src={cursiv} alt="cursiv"></img></div>
			<div id="underline" onClick={props.setUnderlined}><img src={underline} alt="underline"></img></div>
		</div>
		<div id="func"><img src={func} alt="func"></img></div>
		</div>
		<div className="bottom-panel">
			<input type="text" placeholder="номер ячейки" id="cell-name"></input>
			<input type="text" placeholder="значение ячейки" id="cell-value" onChange={props.monitorChange}></input>
		</div>
		</header>
	);
}
export default Header;
