function Header() {
	
	return(
		<header>
			<img src="../public/images/logo.png" alt="logo_image"/>
			<div className="flex-box">
				<div className="button">Файл</div>
				<div className="button" id="vid">Вид</div>
				<div className="button">Формулы</div>
				<div className="button">Справка</div>
			</div>
		<div className="toolPanel"></div>
		<div className="bottom-panel"></div>
		
		</header>
	);
}
export default Header;
