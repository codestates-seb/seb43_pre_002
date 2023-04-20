import styled from 'styled-components';

function QuestionUserInfo() {
	return (
		<QuestionUserInfoContainer>
			<span className="user-icon">😆</span>
			<a href="www.google.com" className="user-profile">
				Kim Coding
			</a>
			<span className="user-updated">asked 56secs ago</span>
		</QuestionUserInfoContainer>
	);
}

export default QuestionUserInfo;

const QuestionUserInfoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25%;
	height: 20%;
	background-color: white;
	position: absolute;
	bottom: 5%;
	right: 5%;
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
