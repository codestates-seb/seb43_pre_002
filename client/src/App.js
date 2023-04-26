import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIsLogin } from './reducers/loginSlice';
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
import EditQuestion from './pages/EditQuestion';
import EditAnswer from './pages/EditAnswer';
import Timeline from './pages/Timeline';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		// 요청 헤더에 액세스토큰 값 설정 및 인가 시 로그인 상태 유지
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		dispatch(setIsLogin(true));
	}, []);

	return (
		<BrowserRouter>
			<GlobalStyles />
			<LoginHeader />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/question/:question_id" element={<Question />} />
				<Route path="/edit/question/:question_id" element={<EditQuestion />} />
				<Route path="/edit/answer/:answer_id" element={<EditAnswer />} />
				<Route
					path="/timeline/:question_id/:answer_id"
					element={<Timeline />}
				/>
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
	);
}

export default App;
