import styled from 'styled-components';

function QuestionUserInfo() {
	return (
		<QuestionUserInfoContainer>
			<span className="user-icon">😆</span>
			<a href="www.google.com" className="user-profile">
				Kim Coding
			</a>
			<span className="user-activity">1,139</span>
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
	background-color: cyan;
	position: absolute;
	bottom: 5%;
	right: 5%;
	.user-icon,
	.user-profile,
	.user-activity {
		margin-right: 10px;
	}
`;
