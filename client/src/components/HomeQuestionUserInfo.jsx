import styled from 'styled-components';

function HomeQuestionUserInfo({ data }) {
	const parsedDate = new Date(data.createdAt).toLocaleString('ko-kr');
	return (
		<QuestionUserInfoContainer>
			<span className="user-icon">😆</span>
			<a href="www.google.com" className="user-profile">
				{data.author}
			</a>
			<span className="user-updated">{parsedDate}</span>
		</QuestionUserInfoContainer>
	);
}

export default HomeQuestionUserInfo;

const QuestionUserInfoContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	width: 30%;
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
	.user-profile {
		color: #3b6fa0; // 전역변수로 바꾸기
		:hover {
			color: var(--main-color);
		}
	}
	.user-updated {
		color: gray;
	}
`;
