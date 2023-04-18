import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles.style';

function MyHeader() {
	return (
		<div>
			<GlobalStyles />
			<ProfileHeader>
				<Profile>
					<UserImg>2pro</UserImg>
					<div>
						<span>2Pro</span>
						<span>User Title</span>
						<span>질문 수 : 0 답변 수 : 0</span>
					</div>
				</Profile>
				<div>
					<button type="button">Exit Profile</button>
					<button type="button">Delete Account</button>
				</div>
			</ProfileHeader>
			<div>
				<button type="button">Profile</button>
				<button type="button">Activity</button>
			</div>
		</div>
	);
}
const ProfileHeader = styled.div`
	display: flex;
	justify-content: space-between; /* 왼쪽 오른쪽에 요소가 붙도록 */
	align-items: center;
	width: 100vw;
	height: 26%;
	padding: 0 16px;
`;

const Profile = styled.div`
	display: flex;
	flex-direction: row;
`;

const UserImg = styled.div`
	background-color: var(--main-color);
	color: white;
	width: 10vw;
	height: 10vw;
	font-size: var(--font-title-large);
	font-weight: bold;
	text-align: center;
	padding: 9% 0;
`;

export default MyHeader;
