import styled from 'styled-components';

function QuestionContents() {
	return (
		<QuestionContentsContainer>
			<h3 className="question-header">
				How to validate dynamic string condition with request string condition
				in laravel?
			</h3>
			<p className="question-body">
				I am using laravel framework to develop API,now one scenario facing i
				have one column inside database which will store as a string Actually i
				am using that string to check in where condition in
			</p>
		</QuestionContentsContainer>
	);
}

export default QuestionContents;

const QuestionContentsContainer = styled.div`
	display: flex;
	flex-direction: column;

	height: 80%;
	padding: 0 2%;
	.question-header {
		margin: 1% 0 1% 0;
	}
	.question-body {
		margin: 0;
		width: 80%;
	}
`;
