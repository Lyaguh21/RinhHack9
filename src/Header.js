function Header() {
	
	return(
		<header>
			<img src="../public/images/logo.png" alt="logo_image"/>
			<div className="flex-box">
				<div className="button">Файл</div>
				<div className="button">Вид</div>
				<div className="button">Формулы</div>
				<div className="button">Справка</div>
			</div>
		</header>
	);
}
export default Header;
