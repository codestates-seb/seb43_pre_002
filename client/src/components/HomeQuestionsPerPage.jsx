import styled from 'styled-components';

function HomeQuestionsPerPage() {
	return (
		<QuestionsPerPageContainer>
			<button className="question-counts" type="button">
				15
			</button>
			<button className="question-counts" type="button">
				30
			</button>
			<button className="question-counts" type="button">
				45
			</button>
			<div>per page</div>
		</QuestionsPerPageContainer>
	);
}

export default HomeQuestionsPerPage;

const QuestionsPerPageContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	width: 30%;
	position: absolute;
	right: 2%;
	.question-counts {
		width: 60px;
		height: 30px;
		margin-right: 5px;
		background-color: white;
		border-radius: 5px;
		border-color: var(--line-color);
		cursor: pointer;
		&:hover {
			background-color: var(--line-color);
		}
	}
`;
