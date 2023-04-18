import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from '../../styles/GlobalStyles.style';

function UserHeader() {
	return (
		<Wrap>
			<GlobalStyles />
			<ProfileHeader>
				<Profile>
					<UserImg>2pro</UserImg>
					<UserInfo>
						<Name>2Pro</Name>
						<Info>User Title</Info>
						<Info>질문 수 : 0 답변 수 : 0</Info>
					</UserInfo>
				</Profile>
			</ProfileHeader>
			<PageButtons>
				<Link to="/userprofile">
					<PageButton type="button">Profile</PageButton>
				</Link>
				<Link to="/useractivity">
					<PageButton type="button">Activity</PageButton>
				</Link>
			</PageButtons>
		</Wrap>
	);
}

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

const ProfileHeader = styled.div`
	display: flex;
	justify-content: space-between; /* 왼쪽 오른쪽에 요소가 붙도록 */
	align-items: center;
	width: 70vw;
	height: 26%;
	padding: 0 12px;
`;

const Profile = styled.div`
	display: flex;
	flex-direction: row;
`;

const UserImg = styled.div`
	background-color: var(--main-color);
	color: white;
	width: 100px;
	height: 100px;
	font-size: var(--font-title-large);
	font-weight: bold;
	text-align: center;
	padding: 35px 0;
	border-radius: 15px;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 15px;
`;

const Name = styled.div`
	font-size: var(--font-title-large);
	font-weight: bold;
	margin-top: 25px;
	margin-bottom: 15px;
`;

const Info = styled.div`
	color: var(--main-color);
	font-size: var(--font-base);
	font-weight: bold;
	margin-bottom: 5px;
`;

const PageButtons = styled.div`
	display: flex;
	width: 100%;
	margin-top: 60px;
	margin-bottom: 50px;
`;

const PageButton = styled.button`
	margin-right: 20px;
	width: 100px;
	height: 30px;
	background-color: white;
	border: 3px solid var(--main-color);
	border-radius: 20px;
	font-size: var(--font--large);
	font-weight: bold;
	:hover {
		background-color: #3b6fa0;
		border: #3b6fa0;
		color: white;
	}
`;

export default UserHeader;
