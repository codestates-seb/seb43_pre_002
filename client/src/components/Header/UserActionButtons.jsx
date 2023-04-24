import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
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
	const userDisplayName = 'abcde12345'; // 임시 데이터
	// const { memberId } = localStorage.getItem('user');
	// useEffect(() => {
	// 	axios
	// 		.get(`/members/${memberId}`)
	// 		.then((res) => {
	// 			return res.data;
	// 		})
	// 		.then((data) => {
	// 			const userDisplayName = data.member[0].displayName;
	// 		});
	// }, []);

	const navigate = useNavigate();
	const logoutHandler = () => {
		navigate('/');
		// 로컬스토리지의 유저 정보, 토큰 삭제 코드 추가해야 함
		// localStorage.removeItem('user');
	};

	return (
		<UserActionsContainer>
			<UserProfileContainer>
				<Link to="/myprofile">
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
