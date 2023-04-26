import styled from 'styled-components';

function HomeQuestionInfo({ data }) {
	return (
		<QuestionInfoContainer>
			<div className="info">{data.questionVoteCount} votes</div>
			<div className="info">
				{data.answerCount ? data.answerCount : 0} answers
			</div>
			<div className="info">{data.viewCount} views</div>
		</QuestionInfoContainer>
	);
}

export default HomeQuestionInfo;

const QuestionInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: right;
	align-items: right;
	width: 15%;
	margin-left: 2%;
	.info {
		display: flex;
		justify-content: right;
		font-size: var(--font-large);
		width: 100px;
		margin-bottom: 5%;
	}
`;
