import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles.style';
import MyEdit from './pages/mypage/myedit';
import MyProfile from './pages/mypage/myprofile';
import MyActivity from './pages/mypage/myactivity';
import AskQuestion from './pages/AskQuestion';
import UserActivity from './pages/user/useractivity';
import UserProfile from './pages/user/userprofile';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import LoginHeader from './components/Header/LoginHeader';
import SignupSuccess from './pages/SignupSuccess/SignupSuccess';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	return (
		<GlobalStyles>
			<BrowserRouter>
				<LoginHeader isLogin={isLogin} setIsLogin={setIsLogin} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/askquestion" element={<AskQuestion />} />
					<Route path="/useractivity/:member_id" element={<UserActivity />} />
					<Route path="/userprofile/:member_id" element={<UserProfile />} />
					<Route path="/myactivity/:member_id" element={<MyActivity />} />
					<Route path="/myprofile/:member_id" element={<MyProfile />} />
					<Route path="/myedit/:member_id" element={<MyEdit />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signupsuccess" element={<SignupSuccess />} />
				</Routes>
			</BrowserRouter>
		</GlobalStyles>
	);
}

export default App;
