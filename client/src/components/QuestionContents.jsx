import styled from 'styled-components';

function QuestionContents() {
	return (
		<QuestionContentsContainer>
			<a href="/" className="question-header">
				<span>
					How to validate dynamic string condition with request string condition
					in laravel?
				</span>
			</a>
			<p className="question-body">
				I am using laravel framework to develop API,now one scenario facing i
				have one column inside database which will store as a string Actually i
				am using that string to check in where condition in ...
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
		margin: 1% 0 2% 0;
		font-size: var(--font-title-small);
		font-weight: 700;
		color: var(--main-color);
	}
	.question-body {
		margin: 0;
		width: 80%;
		font-size: var(--font-base);
	}
`;
