import styled from 'styled-components';

function Submit() {
	return (
		<SubmitContainer>
			<div className="button-container">
				<button className="submit-button" type="submit">
					Submit
				</button>
			</div>
		</SubmitContainer>
	);
}

export default Submit;

const SubmitContainer = styled.div`
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
				background-color: #3b6fa0; // 전역변수로 바꾸기
			}
		}
	}
`;
