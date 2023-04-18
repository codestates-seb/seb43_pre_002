import styled from 'styled-components';

function QuestionInfo() {
	return (
		<QuestionInfoContainer>
			<div className="info">0 votes</div>
			<div className="info">0 answers</div>
			<div className="info">0 views</div>
		</QuestionInfoContainer>
	);
}

export default QuestionInfo;

const QuestionInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: right;
	width: 15%;
	text-align: right;
	margin-right: 5%;
	.info {
		font-size: var(--font-large);
		margin-bottom: 5%;
	}
`;
