import styled from 'styled-components';
import NewQuestionHeader from '../components/NewQuestionHeader';
import AskDescription from '../components/AskDescription';
import AskTitleBox from '../components/AskTitleBox';

function NewQuestion() {
	return (
		<NewQuestionContainer>
			<NewQuestionHeader />
			<AskDescription />
			<AskTitleBox />
		</NewQuestionContainer>
	);
}

export default NewQuestion;

const NewQuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 80vw;
	background-color: var(--base-color);
`;
