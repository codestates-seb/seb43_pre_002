import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyActivity from './pages/mypage/myactivity';
import MyProfile from './pages/mypage/myprofile';
import MyEdit from './pages/mypage/myedit';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/myactivity/:member_id" element={<MyActivity />} />
					<Route path="/myprofile/:member_id" element={<MyProfile />} />
					<Route path="/myedit/:member_id" element={<MyEdit />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
