import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import { timeForToday } from '../utils/dateFormat';

function HomeQuestionUserInfo({ data, memberId, memberName }) {
	const date = new Date(data.createdAt);
	// const parsedDate = date.toLocaleString('ko-kr');
	const parsedDate = timeForToday(date);
	return (
		<QuestionUserInfoContainer>
			<div className="user-container">
				<UserProfile
					userName={memberName || 'user'}
					boxSize="28px"
					fontSize="10px"
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
	justify-content: right;
	align-items: center;
	width: 230px;
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
			color: var(--button-hover-color);
			margin-left: 5px;
			:hover {
				color: var(--main-color);
			}
		}
	}

	.user-updated {
		color: gray;
	}
`;
