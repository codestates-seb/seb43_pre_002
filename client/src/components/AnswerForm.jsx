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
	const [newAnswer, setNewAnswer] = useState({
		id: 0,
		answer_id: 0,
		title: 'koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다',
		content: '',
		content_open_status: true,
		answer_selection_status: true,
		answer_status: true,
		member_id: 1,
		question_id: 2,
		created_at: new Date(),
		modified_at: new Date(),
	});

	const newContentHandler = (e) => {
		setNewAnswer({
			...newAnswer,
			content: e,
		});
	};

	const buttonHandler = (e) => {
		e.preventDefault();
		if (window.confirm('작성하시겠습니까?')) {
			createAnswerHandler(newAnswer);
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
