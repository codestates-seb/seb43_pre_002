import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import UserActivity from './pages/user/useractivity';
import UserProfile from './pages/user/userprofile';

function App() {
	return (
		<div>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/useractivity" element={<UserActivity />} />
					<Route path="/userprofile" element={<UserProfile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

const GlobalStyles = createGlobalStyle`
	#root{
		display: flex;
		justify-content: center;
	}
`;

export default App;
