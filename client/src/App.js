import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import Question from './pages/Question';
import EditQnA from './pages/EditQnA';
import Timeline from './pages/Timeline';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const loginMemberId = localStorage.getItem('loginMemberId');
	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		const expiresIn = localStorage.getItem('expires_in');

		if (accessToken && loginMemberId && expiresIn) {
			// 현재 시간을 초(second) 단위로 계산
			const now = Math.floor(Date.now() / 1000);

			// 만료 시간이 지났다면 로그아웃 처리
			if (now >= parseInt(expiresIn, 10)) {
				localStorage.removeItem('access_token');
				localStorage.removeItem('loginMemberId');
				localStorage.removeItem('expires_in');
				setIsLogin(false);
				return;
			}
			axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
			setIsLogin(true);
		}
	}, []);
	// 로그인 상태, (memberId) 전역상태로 관리
	return (
		<BrowserRouter>
			<GlobalStyles />
			<LoginHeader
				isLogin={isLogin}
				setIsLogin={setIsLogin}
				setSearchTerm={setSearchTerm}
			/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/question/:question_id" element={<Question />} />
				<Route path="/edit/:qna_id" element={<EditQnA />} />
				<Route path="/timeline/:qna_id" element={<Timeline />} />
				<Route path="/askquestion" element={<AskQuestion />} />
				<Route path="/useractivity/:member_id" element={<UserActivity />} />
				<Route path="/userprofile/:member_id" element={<UserProfile />} />
				<Route path="/myactivity/:member_id" element={<MyActivity />} />
				<Route path="/myprofile/:member_id" element={<MyProfile />} />
				<Route path="/myedit/:member_id" element={<MyEdit />} />
				<Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signupsuccess" element={<SignupSuccess />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
