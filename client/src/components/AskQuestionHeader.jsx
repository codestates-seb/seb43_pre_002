import styled from 'styled-components';

function AskQuestionHeader() {
	return (
		<AskQuestionHeaderContainer>
			<h1 className="header-text">Ask a public question</h1>
			<div className="img-container">
				<img
					className="ask-page-img"
					src="assets/ask-page-img.png"
					alt="robot-img"
				/>
			</div>
		</AskQuestionHeaderContainer>
	);
}

export default AskQuestionHeader;

const AskQuestionHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #f8f9f9; // 전역변수로 바꾸기
	width: 100%;
	min-height: 150px;
	padding-left: 2%;
	.header-text {
		font-weight: 700;
		font-size: var(--font-title-large);
	}
	.img-container {
		@media screen and (max-width: 800px) {
			display: none;
		}
		width: 600px;
		height: 100%;
		.ask-page-img {
			width: 100%;
			height: 100%;
		}
	}
`;
