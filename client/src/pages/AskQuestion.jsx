import styled from 'styled-components';
import AskQuestionHeader from '../components/AskQuestionHeader';
import AskDescription from '../components/AskDescription';
import AskTitleBox from '../components/AskTitleBox';
import AskDetailBox from '../components/AskDetailBox';
import AskTryAndExpectBox from '../components/AskTryAndExpectBox';
import AskSubmit from '../components/AskSubmit';

function AskQuestion() {
	return (
		<AskQuestionContainer>
			<AskQuestionHeader />
			<AskDescription />
			<AskTitleBox />
			<AskDetailBox />
			<AskTryAndExpectBox />
			<AskSubmit />
		</AskQuestionContainer>
	);
}

export default AskQuestion;

const AskQuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 160%;
	background-color: #f8f9f9; // 전역변수로 바꾸기
	padding: 0 8%;
`;
