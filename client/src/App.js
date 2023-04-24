import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles.style';
import MyEdit from './pages/mypage/myedit';
import MyProfile from './pages/mypage/myprofile';
import MyActivity from './pages/mypage/myactivity';
import UserActivity from './pages/user/useractivity';
import UserProfile from './pages/user/userprofile';

function App() {
	return (
		<div>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/myprofile" element={<MyProfile />} />
					<Route path="/myactivity" element={<MyActivity />} />
					<Route path="/myedit" element={<MyEdit />} />
					<Route path="/useractivity/:member_id" element={<UserActivity />} />
					<Route path="/userprofile/:member_id" element={<UserProfile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
