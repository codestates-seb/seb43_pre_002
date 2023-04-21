import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useEffect } from 'react';

function TryAndExpect({
	setIsTryAndExpectFocus,
	register,
	isNext,
	setIsNext,
	setValue,
	watch,
}) {
	const onBlur = () => setIsTryAndExpectFocus(false);
	const editorContent = watch('tryAndExpect');
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
					style={{ height: '150px' }}
					onFocus={() => setIsTryAndExpectFocus(true)}
					onBlur={onBlur}
					value={editorContent}
					onChange={onEditorStateChange}
				/>
			</div>
			<button className="next" type="button">
				Next
			</button>
		</TryAndExpectContainer>
	);
}

export default TryAndExpect;

const TryAndExpectContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 65%;
	height: 300px;
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
		height: 200px;
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
			background-color: #3b6fa0; // 전역변수로 바꾸기
		}
		cursor: pointer;
	}
`;
