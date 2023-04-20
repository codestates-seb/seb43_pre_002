import styled from 'styled-components';

function AskTitle({ setIsTitleFocus, register }) {
	const onBlur = () => setIsTitleFocus(false);
	return (
		<AskTitleContainer>
			<h5 className="title">Title</h5>
			<div className="descriptor">
				Be specific and imagine you’re asking a question to another person.
			</div>
			<div className="input-container">
				<input
					type="text"
					className="input-container__title-input"
					placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
					onFocus={() => setIsTitleFocus(true)}
					{...register('title', { onBlur })}
				/>
			</div>
			<button className="next" type="button">
				Next
			</button>
		</AskTitleContainer>
	);
}

export default AskTitle;

const AskTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 65%;
	height: 150px;
	padding: 1% 1% 1% 2%;
	background-color: white;
	border-radius: 5px;
	border: 1px solid var(--line-color);
	margin-right: 2%;
	.title {
		font-size: var(--font-large);
		font-weight: 700;
		margin: 1% 0;
	}
	.descriptor {
		font-size: var(--font-base);
		margin-bottom: 0.5%;
	}
	.input-container {
		width: 100%;
		height: 1.5em;
		margin-bottom: 1%;
	}
	.input-container__title-input {
		width: 100%;
		height: 100%;
	}
	.next {
		color: white;
		background-color: var(--main-color);
		width: 6%;
		height: 2em;
		&:hover {
			background-color: #3b6fa0; // 전역변수로 바꾸기
		}
		cursor: pointer;
	}
`;
