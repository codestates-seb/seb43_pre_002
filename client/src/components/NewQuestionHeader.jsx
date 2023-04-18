import styled from 'styled-components';

function NewQuestionHeader() {
	return (
		<NewQuestionHeaderContainer>
			<h1 className="header-text">Ask a public question</h1>
			<div className="img">img 자리</div>
		</NewQuestionHeaderContainer>
	);
}

export default NewQuestionHeader;

const NewQuestionHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: skyblue;
	width: 100%;
	height: 120px;
	padding-left: 2%;
	.header-text {
		font-weight: 700;
		font-size: var(--font-title-large);
	}
	.img {
		width: 50%;
		height: 100%;
		background-color: yellow;
	}
`;
