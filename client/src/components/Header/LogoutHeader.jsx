import styled from 'styled-components';
import SignButton from '../Button/SignButton';
import SearchBar from '../Input/SearchBar';
import UserProfile from '../UserProfile';
import Logo from './Logo';

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	width: 100%;
	padding: 0 20px;
	background-color: #eee;
	box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.25);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`;

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	max-width: 100%;
	height: 100%;
	margin: 0 auto;
`;

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
// 링크 컴포넌트로 수정해야 함 (홈으로 이동?)
const LogoutButton = styled(SignButton)`
	font-size: var(--font-base);
	font-weight: 800;
	width: 70px;
	height: 35px;
	margin: 0 10px;
`;

function LogoutHeader() {
	const userDisplayName = 'abcde12345'; // 임시 데이터

	return (
		<Header>
			<HeaderContainer>
				<Logo />
				<SearchBar type="text" placeholder="검색어를 입력하세요." />
				<UserActionsContainer>
					<UserProfileContainer>
						<UserProfile
							userName={userDisplayName}
							boxSize="35px"
							fontSize="var(--font-base)"
						/>
					</UserProfileContainer>
					<LogoutButton>Log out</LogoutButton>
				</UserActionsContainer>
			</HeaderContainer>
		</Header>
	);
}

export default LogoutHeader;
