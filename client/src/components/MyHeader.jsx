import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles.style';
import DeleteModal from './DeleteModal';

function MyHeader() {
	const [isOpen2, setIsOpen2] = useState(false);

	const handleClick2 = () => {
		setIsOpen2(!isOpen2);
	};

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
				<Buttons>
					<ButtonEdit type="button">
						<FaPencilAlt size={13} />
						<Link to="/myedit">
							<Span>Exit Profile</Span>
						</Link>
					</ButtonEdit>
					<ButtonDelete type="button" onClick={handleClick2}>
						Delete Account
					</ButtonDelete>
					<DeleteModal isOpen={isOpen2} setIsOpen={setIsOpen2} />
				</Buttons>
			</ProfileHeader>
			<PageButtons>
				<Link to="/myprofile">
					<PageButton type="button">Profile</PageButton>
				</Link>
				<Link to="/myactivity">
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

const Buttons = styled.div`
	display: flex;
	flex-direction: column;
`;

const ButtonEdit = styled.button`
	background-color: white;
	border: 1.5px solid var(--line-color);
	border-radius: 5px;
	font-weight: bold;
	:hover {
		border: 1.5px solid black;
	}
`;
const ButtonDelete = styled.button`
	background-color: white;
	border: 1.5px solid var(--line-color);
	border-radius: 5px;
	color: #cb2a2a;
	font-weight: bold;
	margin-top: 5px;
	:hover {
		border: 1.5px solid #cb2a2a;
	}
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
const Span = styled.span`
	margin-left: 3px;
`;

export default MyHeader;
