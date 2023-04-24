import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles.style';
import MyEdit from './pages/mypage/myedit';
import MyProfile from './pages/mypage/myprofile';
import MyActivity from './pages/mypage/myactivity';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import LoginHeader from './components/Header/LoginHeader';
import SignupSuccess from './pages/SignupSuccess/SignupSuccess';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	return (
		<div>
			<GlobalStyles />
			<BrowserRouter>
				<LoginHeader isLogin={isLogin} setIsLogin={setIsLogin} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/myprofile" element={<MyProfile />} />
					<Route path="/myactivity" element={<MyActivity />} />
					<Route path="/myedit" element={<MyEdit />} />
					<Route path="/signupsuccess" element={<SignupSuccess />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
