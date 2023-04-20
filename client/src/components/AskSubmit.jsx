import styled from 'styled-components';

function AskSubmit() {
	return (
		<AskSubmitContainer>
			<div className="button-container">
				<button className="submit-button" type="button">
					Submit
				</button>
			</div>
		</AskSubmitContainer>
	);
}

export default AskSubmit;

const AskSubmitContainer = styled.div`
	display: flex;
	.button-container {
		display: flex;
		justify-content: right;
		width: 65%;
		height: 50px;
		.submit-button {
			width: 100px;
			height: 40px;
			color: white;
			font-size: var(--font-large);
			background-color: var(--main-color);
			cursor: pointer;
			&:hover {
				background-color: var(--button-hover-color);
			}
		}
	}
`;
