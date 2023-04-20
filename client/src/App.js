import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles.style';
import MyEdit from './pages/mypage/myedit';
import MyProfile from './pages/mypage/myprofile';
import MyActivity from './pages/mypage/myactivity';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';

function App() {
	return (
		<div>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/myprofile" element={<MyProfile />} />
					<Route path="/myactivity" element={<MyActivity />} />
					<Route path="/myedit" element={<MyEdit />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
