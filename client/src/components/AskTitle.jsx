import { useState } from 'react';
import styled from 'styled-components';

function AskTitle({ setIsTitleFocus, register, isNext, setIsNext, watch }) {
	const [isValid, setIsValid] = useState(false);
	const onBlur = () => setIsTitleFocus(false);
	const editorContent = watch('title');
	const handleClick = () => {
		const leng = editorContent ? editorContent.length : 0;
		if (leng < 1) {
			setIsValid(true);
			return;
		}
		const newObj = { ...isNext, title: true };
		setIsNext(newObj);
		setIsValid(false);
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
			{!isNext.title ? (
				<button className="next" type="button" onClick={handleClick}>
					Next
				</button>
			) : null}
			{isValid ? <p className="invalid">제목을 작성해주세요!</p> : null}
		</AskTitleContainer>
	);
}

export default AskTitle;

const AskTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
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
			background-color: var(--button-hover-color);
		}
		cursor: pointer;
	}
	.invalid {
		position: absolute;
		bottom: 14%;
		left: 11%;
		color: red;
	}
`;
