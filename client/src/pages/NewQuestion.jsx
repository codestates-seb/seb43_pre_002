import styled from 'styled-components';
import NewQuestionHeader from '../components/NewQuestionHeader';
import AskDescription from '../components/AskDescription';
import AskTitleBox from '../components/AskTitleBox';
import AskDetailBox from '../components/AskDetailBox';
import TryAndExpectBox from '../components/TryAndExpectBox';
import Submit from '../components/Submit';

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
	background-color: var(--base-color);
	padding: 0 8%;
`;
