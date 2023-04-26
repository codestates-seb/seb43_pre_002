import styled from 'styled-components';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AnswerFormContainer = styled.form`
	display: flex;
	flex-direction: column;

	> span {
		margin: 20px 0px;
		font-size: var(--font-title-small);
	}
	> textarea {
		height: 100px;
	}
	button {
		margin: 10px 0px;
		width: 130px;
		height: 40px;
		background-color: var(--main-color);
		color: white;
		border: none;
		cursor: pointer;
	}

	.ql-container {
		min-height: 10rem;
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.ql-editor {
		height: 100%;
		flex: 1;
		overflow-y: auto;
		width: 100%;
	}
`;
function AnswerForm({ createAnswerHandler }) {
	const [newAnswer, setNewAnswer] = useState('');

	const newContentHandler = (e) => {
		setNewAnswer({
			content: e,
		});
	};

	const buttonHandler = (e) => {
		e.preventDefault();
		if (window.confirm('작성하시겠습니까?')) {
			createAnswerHandler(newAnswer);
			setNewAnswer('');
			alert('작성되었습니다.');
		} else {
			alert('취소합니다.');
		}
	};

	return (
		<AnswerFormContainer>
			<span>Your Answer</span>
			<ReactQuill
				theme="snow"
				value={newAnswer.content}
				onChange={newContentHandler}
			/>
			<div className="bottom__container">
				<button type="submit" onClick={buttonHandler}>
					Post Your Answer
				</button>
			</div>
		</AnswerFormContainer>
	);
}

export default AnswerForm;
