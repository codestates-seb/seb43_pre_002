import styled from 'styled-components';
import QuestionInfo from './QuestionInfo';
import QuestionUserInfo from './QuestionUserInfo';
import QuestionContents from './QuestionContents';

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
	width: 100%;
	height: 150px;
	background-color: beige;
	position: relative;
	border-top: 1px solid black;
`;
