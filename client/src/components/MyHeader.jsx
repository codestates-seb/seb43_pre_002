/* eslint-disable camelcase */
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles.style';
import DeleteModal from './DeleteModal';
import UserProfile from './UserProfile';

function MyHeader() {
	const [isOpen2, setIsOpen2] = useState(false);
	const [userData, setUserData] = useState({});
	const { member_id } = useParams();
	const navigate = useNavigate();

	const handleClick2 = () => {
		setIsOpen2(!isOpen2);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/members/${member_id}`, {
					headers: {
						'ngrok-skip-browser-warning': '69420',
					},
				});
				setUserData(result.data);
			} catch (error) {
				console.error(error);
				navigate('/');
			}
		};
		fetchData();
	}, []);

	const filteredArticles = userData.questions ? userData.questions : [];

	const filteredAnswerd = userData.answers ? userData.answers : [];

	return (
		<Wrap>
			<GlobalStyles />
			<ProfileHeader>
				<Profile>
					<UserProfile
						userName={String(userData.displayName)}
						boxSize="100px"
						fontSize="27px"
					/>
					<UserInfo>
						<Name>{userData && userData.displayName}</Name>
						<Info>{userData && userData.title}</Info>
						<Info>{`질문 수 : ${filteredArticles.length} 답변 수 : ${filteredAnswerd.length}`}</Info>
					</UserInfo>
				</Profile>
				<Buttons>
					<ButtonEdit type="button">
						<FaPencilAlt size={13} />
						<Link to={`/myedit/${member_id}`}>
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
				<Link to={`/myprofile/${member_id}`}>
					<PageButton type="button">Profile</PageButton>
				</Link>
				<Link to={`/myactivity/${member_id}`}>
					<PageButton type="button">Activity</PageButton>
				</Link>
			</PageButtons>
		</Wrap>
	);
}

const Wrap = styled.div`
	margin-top: 50px;
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
	padding-top: 20px;
	display: flex;
	flex-direction: row;
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
	margin-top: 70px;
	margin-bottom: 10px;
	margin-left: 30%;
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
