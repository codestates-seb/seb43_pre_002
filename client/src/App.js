import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles.style';
import MyEdit from './pages/mypage/myedit';
import MyProfile from './pages/mypage/myprofile';
import MyActivity from './pages/mypage/myactivity';
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';

function App() {
	return (
		<div>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/askquestion" element={<AskQuestion />} />
					<Route path="/myprofile" element={<MyProfile />} />
					<Route path="/myactivity" element={<MyActivity />} />
					<Route path="/myedit" element={<MyEdit />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
