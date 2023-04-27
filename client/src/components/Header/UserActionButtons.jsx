import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { setIsLogin } from '../../reducers/loginSlice';
import SignButton from '../Button/SignButton';
import UserProfile from '../UserProfile';

const UserActionsContainer = styled.div`
	display: flex;
	align-items: center;
`;
const UserProfileContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	width: 50px;
	cursor: pointer;
	&:hover {
		background-color: #ccc;
	}
`;

const LogoutButton = styled(SignButton)`
	font-size: var(--font-base);
	font-weight: 800;
	width: 70px;
	height: 35px;
	margin: 0 10px;
`;

function UserActionButtons() {
	const dispatch = useDispatch();

	const [userDisplayName, setUserDisplayName] = useState('');
	const memberId = sessionStorage.getItem('loginMemberId');

	useEffect(() => {
		axios
			.get(`/members/${memberId}`, {
				headers: {
					'Content-Type': 'application/json',
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				setUserDisplayName(data.displayName);
				// console.log(userDisplayName);
			});
	}, []);

	const navigate = useNavigate();
	const logoutHandler = () => {
		dispatch(setIsLogin(false));
		navigate('/');
		setUserDisplayName('');
		// 로컬스토리지의 유저 정보, 토큰, 토큰 유효기간 삭제
		sessionStorage.removeItem('loginMemberId');
		localStorage.removeItem('access_token');
		localStorage.removeItem('expires_in');
	};

	return (
		<UserActionsContainer>
			<UserProfileContainer>
				<Link to={`/myprofile/${memberId}`}>
					<UserProfile
						userName={userDisplayName}
						boxSize="35px"
						fontSize="var(--font-base)"
					/>
				</Link>
			</UserProfileContainer>
			<LogoutButton onClick={logoutHandler}>Log out</LogoutButton>
		</UserActionsContainer>
	);
}

export default UserActionButtons;
