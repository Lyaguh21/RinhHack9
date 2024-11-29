import React, {useState} from 'react'
import Main from './Main.js'
import Header from './Header.js'
import Footer from './Footer.js'

function App() {
	let width = 20;
	let height = 20;
	const table=document.getElementById("table")	

	return(
		<>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
				<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>

			</head>
			<Header />
			<Main height={height} width={width}/>
		</>
	)
}
export default App;
