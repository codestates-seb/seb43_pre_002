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
import Question from './pages/Question';
import EditQnA from './pages/EditQnA';
import Timeline from './pages/Timeline';

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	// 로그인 상태, (memberId) 전역상태로 관리
	return (
		<BrowserRouter>
			<GlobalStyles />
			<LoginHeader
				isLogin={isLogin}
				setIsLogin={setIsLogin}
				searchTerm={searchTerm}
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
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signupsuccess" element={<SignupSuccess />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
