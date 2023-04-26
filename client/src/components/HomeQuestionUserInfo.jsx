import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserProfile from './UserProfile';

function HomeQuestionUserInfo({ data, memberId, memberName }) {
	const date = new Date(data.createdAt);
	date.setHours(date.getHours() + 9);
	const parsedDate = date.toLocaleString('ko-kr');
	return (
		<QuestionUserInfoContainer>
			<div className="user-container">
				<UserProfile
					userName={memberName || 'user'}
					boxSize="20px"
					fontSize="8px"
				/>
				<Link to={`/userprofile/${memberId}`} className="user-profile">
					{memberName}
				</Link>
			</div>
			<span className="user-updated">{parsedDate}</span>
		</QuestionUserInfoContainer>
	);
}

export default HomeQuestionUserInfo;

const QuestionUserInfoContainer = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	width: 21%;
	height: 20%;
	background-color: transparent;
	position: absolute;
	bottom: 5%;
	right: 1%;
	.user-icon,
	.user-profile,
	.user-activity,
	.user-updated {
		margin-right: 7px;
		font-size: var(--font-base);
	}
	.user-container {
		display: flex;
		align-items: center;
		.user-profile {
			color: #3b6fa0; // 전역변수로 바꾸기
			margin-left: 2px;
			:hover {
				color: var(--main-color);
			}
		}
	}

	.user-updated {
		position: absolute;
		right: 0;
		color: gray;
	}
`;
