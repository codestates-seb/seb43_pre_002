import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';

function TryAndExpect({
	setIsTryAndExpectFocus,
	register,
	isNext,
	setIsNext,
	setValue,
	watch,
}) {
	const [isValid, setIsValid] = useState(false);
	const onBlur = () => setIsTryAndExpectFocus(false);
	const editorContent = watch('tryAndExpect');
	const handleClick = () => {
		const leng = editorContent ? editorContent.length : 0;
		if (leng < 27) {
			setIsValid(true);
			return;
		}
		const newObj = { ...isNext, tryAndExpect: true };
		setIsNext(newObj);
		setIsValid(false);
	};
	const onEditorStateChange = (editorState) => {
		setValue('tryAndExpect', editorState);
	};
	useEffect(() => {
		register('tryAndExpect', { required: true, minLength: 20 });
	}, [register]);
	return (
		<TryAndExpectContainer>
			<h5 className="title">What did you try and what were you expecting?</h5>
			<div className="descriptor">
				Describe what you tried, what you expected to happen, and what actually
				resulted. Minimum 20 characters.
			</div>
			<div className="input-container">
				<ReactQuill
					style={{ height: '200px' }}
					onFocus={() => setIsTryAndExpectFocus(true)}
					onBlur={onBlur}
					value={editorContent}
					onChange={onEditorStateChange}
				/>
			</div>
			{!isNext.tryAndExpect ? (
				<button className="next" type="button" onClick={handleClick}>
					Next
				</button>
			) : null}
			{isValid ? <p className="invalid">20자 이상 작성해주세요!</p> : null}
		</TryAndExpectContainer>
	);
}

export default TryAndExpect;

const TryAndExpectContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 65%;
	height: 350px;
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
		height: 250px;
		margin-bottom: 1%;
	}
	.input-container__detail-input {
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
		bottom: 4%;
		left: 11%;
		color: red;
	}
`;
