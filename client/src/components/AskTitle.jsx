import styled from 'styled-components';

function AskTitle({ setIsTitleFocus, register, isNext, setIsNext, detailRef }) {
	const onBlur = () => setIsTitleFocus(false);
	const handleClick = () => {
		const newObj = { ...isNext, title: false };
		setIsNext(newObj);
		detailRef.current.focus();
	};
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
			{isNext.title ? (
				<button className="next" type="button" onClick={handleClick}>
					Next
				</button>
			) : null}
		</AskTitleContainer>
	);
}

export default AskTitle;

const AskTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 65%;
	padding: 1.5% 1% 1.5% 2%;
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
		margin-bottom: 1.5%;
	}
	.input-container {
		width: 100%;
		height: 1.5em;
		margin-bottom: 1.5%;
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
