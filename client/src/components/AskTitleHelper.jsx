import styled from 'styled-components';

function AskTitleHelpler() {
	return (
		<AskTitleHelperContainer>
			<h5 className="title">Writing a good title</h5>
			<div className="descriptor">
				<div className="descriptor__icon">img자리</div>
				<div className="descriptor__contents">
					<p>Your title should summarize the problem.</p>
					<p>
						You might find that you have a better idea of your title after
						writing out the rest of the question.
					</p>
				</div>
			</div>
		</AskTitleHelperContainer>
	);
}

export default AskTitleHelpler;

const AskTitleHelperContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	.title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 25%;
		background-color: var(--base-color);
		border: 1px solid var(--line-color);
		border-radius: 5px 5px 0 0;
		font-size: var(--font-large);
		font-weight: 700;
		padding-left: 1%;
	}
	.descriptor {
		display: flex;
		width: 100%;
		height: 75%;
		background-color: white;
		padding: 1%;
		border: solid var(--line-color);
		border-width: 0 1px 1px 1px;
		border-radius: 0 0 5px 5px;
		p {
			font-size: var(--font-base);
			margin: 1em 0;
		}
	}
	.descriptor__icon {
		width: 30%;
	}
	.descriptor__contents {
		width: 70%;
	}
`;
