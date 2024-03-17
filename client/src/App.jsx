//Router
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Pages
import { LogIn } from "./pages/shared/LogIn/LogIn";
import { Register } from "./pages/shared/Register/Register";

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LogIn/>}/>
					<Route path='/register' element={<Register/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
