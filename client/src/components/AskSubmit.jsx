import styled from 'styled-components';

function Submit({ isNext }) {
	return (
		<AskSubmitContainer>
			<div className="button-container">
				{!isNext.tryAndExpect ? <div className="disabled" /> : null}
				<button className="submit-button" type="submit">
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
			border-radius: 5px;
			cursor: pointer;
			&:hover {
				background-color: var(--button-hover-color);
			}
		}
		.disabled {
			position: absolute;
			width: 100px;
			height: 40px;
			border-radius: 5px;
			opacity: 0.8;
			background-color: var(--line-color);
			z-index: 1;
			cursor: not-allowed;
		}
	}
`;
