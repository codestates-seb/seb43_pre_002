import styled from 'styled-components';
import NewQuestionHeader from '../components/AskQuestionHeader';
import AskDescription from '../components/AskDescription';
import AskTitleBox from '../components/AskTitleBox';
import AskDetailBox from '../components/AskDetailBox';
import TryAndExpectBox from '../components/AskTryAndExpectBox';
import Submit from '../components/AskSubmit';

function NewQuestion() {
	return (
		<NewQuestionContainer>
			<NewQuestionHeader />
			<AskDescription />
			<AskTitleBox />
			<AskDetailBox />
			<TryAndExpectBox />
			<Submit />
		</NewQuestionContainer>
	);
}

export default NewQuestion;

const NewQuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 160%;
	background-color: #f8f9f9; // 전역변수로 바꾸기
	padding: 0 8%;
`;
