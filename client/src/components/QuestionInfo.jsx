import styled from 'styled-components';

function QuestionInfo() {
	return (
		<QuestionInfoContainer>
			<div>votes</div>
			<div>answers</div>
			<div>views</div>
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
	margin-right: 3%;
`;
