import styled from 'styled-components';

function AskDescription() {
	return (
		<AskDescriptionContainer>
			<h2 className="header">Writing a good question</h2>
			<p className="description">
				You’re ready to ask a programming-related question and this form will
				help guide you through the process.
			</p>
			<p className="description">
				Looking to ask a non-programming question? See the topics here to find a
				relevant site.
			</p>
			<h5 className="steps">Steps</h5>
			<ul className="list-container">
				<li className="list-container__list">
					Summarize your problem in a one-line title.
				</li>
				<li className="list-container__list">
					Describe your problem in more detail.
				</li>
				<li className="list-container__list">
					Describe what you tried and what you expected to happen.
				</li>
				<li className="list-container__list">
					Add “tags” which help surface your question to members of the
					community.
				</li>
				<li className="list-container__list">
					Review your question and post it to the site.
				</li>
			</ul>
		</AskDescriptionContainer>
	);
}

export default AskDescription;

const AskDescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--main-color-lighten);
	width: 65%;
	height: 200px;
	padding: 2% 3% 0;
	border: 1px solid var(--main-color);
	border-radius: 5px;
	margin-bottom: 1%;
	.header {
		font-size: var(--font-title-small);
		font-weight: 700;
		margin-bottom: 2%;
	}
	.description {
		font-size: var(--font-large);
	}
	.steps {
		font-size: var(--font-large);
		font-weight: 700;
		margin-top: 2%;
	}
	.list-container {
		list-style: circle;
		margin-top: 1%;
	}
	.list-container__list {
		font-size: var(--font-base);
	}
`;
