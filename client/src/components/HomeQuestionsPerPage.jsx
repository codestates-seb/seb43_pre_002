import styled from 'styled-components';

function HomeQuestionsPerPage({ limitItems, setLimitItems, setCurrentPage }) {
	const isActive = (num) => {
		return limitItems === num ? 'active' : '';
	};
	const handleLimitItems = (num) => {
		setLimitItems(num);
		setCurrentPage(1);
		window.scrollTo(0, 0);
	};
	return (
		<QuestionsPerPageContainer>
			<button
				type="button"
				className={`question-counts ${isActive(5)}`}
				onClick={() => handleLimitItems(5)}
			>
				5
			</button>
			<button
				className={`question-counts ${isActive(10)}`}
				onClick={() => handleLimitItems(10)}
				type="button"
			>
				10
			</button>
			<button
				className={`question-counts ${isActive(15)}`}
				onClick={() => handleLimitItems(15)}
				type="button"
			>
				15
			</button>
			<div className="per-page">per page</div>
		</QuestionsPerPageContainer>
	);
}

export default HomeQuestionsPerPage;

const QuestionsPerPageContainer = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	width: 250px;
	position: absolute;
	right: 2%;
	@media screen and (max-width: 600px) {
		right: 2%;
		bottom: 0;
	}
	.question-counts {
		font-size: var(--font-large);
		width: 30px;
		height: 30px;
		margin-right: 5px;
		background-color: white;
		border-radius: 3px;
		border: 1px solid var(--line-color);
		padding: 0.2em 0.4em;
		cursor: pointer;
		&:hover {
			background-color: var(--line-color);
		}
	}
	.question-counts.active {
		color: white;
		background-color: #f48224;
	}
	.per-page {
		font-size: var(--font-large);
		margin: 0 1em;
	}
`;
