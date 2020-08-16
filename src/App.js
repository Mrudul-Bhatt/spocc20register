import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Register from './Register';
import { Scores } from './Score';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Scores />
		</div>
	);
}

export default App;
