import styled from 'styled-components';
import QuestionInfo from './HomeQuestionInfo';
import QuestionUserInfo from './HomeQuestionUserInfo';
import QuestionContents from './HomeQuestionContents';

function QuestionItem() {
	return (
		<QuestionItemContainer>
			<QuestionInfo />
			<QuestionContents />
			<QuestionUserInfo />
		</QuestionItemContainer>
	);
}

export default QuestionItem;

const QuestionItemContainer = styled.div`
	display: flex;
	align-items: center;
	width: 80%;
	min-height: 150px;
	background-color: white;
	position: relative;
	border-top: 1px solid var(--line-color);
	padding: 0 3%;
`;
