import styled from 'styled-components';
import HomeQuestionInfo from './HomeQuestionInfo';
import HomeQuestionUserInfo from './HomeQuestionUserInfo';
import HomeQuestionContents from './HomeQuestionContents';

function HomeQuestionItem({ data }) {
	return (
		<QuestionItemContainer>
			<HomeQuestionInfo />
			<HomeQuestionContents data={data} />
			<HomeQuestionUserInfo />
		</QuestionItemContainer>
	);
}

export default HomeQuestionItem;

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
