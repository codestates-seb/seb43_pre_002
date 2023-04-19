import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserActivity from './pages/user/useractivity';
import UserProfile from './pages/user/userprofile';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/useractivity" element={<UserActivity />} />
					<Route path="/userprofile" element={<UserProfile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
