import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditQuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 50px;
	/* border: black solid 1px; */

	align-items: center;
	width: 100vw;

	main {
		padding: 24px;
		display: flex;
		flex-direction: column;
		/* border: black solid 1px; */
		flex: 1;
		width: 80vw;
	}
`;
const EditQnABox = styled.form`
	display: flex;
	flex-direction: column;

	span {
		padding-bottom: 4px;
		font-size: var(--font-large);
		font-weight: bold;
	}

	button {
		color: white;
		background-color: var(--main-color);
		width: 140px;
		height: 3em;
		font-size: var(--font-large);
		border: 1px inset var(--line-color);
		border-radius: 5px;
		padding: 0;
		cursor: pointer;
		&:hover {
			background-color: var(--button-hover-color);
		}
	}
	.cancel {
		background-color: white;
		color: var(--main-color);
	}
	.cancel:hover {
		border: var(--main-color) solid 0.1px;
	}
`;

const TitleContainer = styled.div`
	padding-bottom: 15px;
	display: flex;
	flex-direction: column;
	input {
		height: 30px;
		padding: 8px;
	}
`;
const BodyContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 8px;
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
const PreviewContainer = styled.div`
	flex: 1;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	padding-bottom: 16px;
	border: black solid 1px;
`;

function EditQuestion() {
	const navigate = useNavigate();
	const location = useLocation();
	const { question_id: targetId } = useParams();
	const [userId, setUserId] = useState(
		sessionStorage.getItem('loginMemberId')
			? JSON.parse(sessionStorage.getItem('loginMemberId'))
			: null,
	);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	// 정보 조회
	useEffect(() => {
		const question = location.state;
		setTitle(question.questionTitle);
		setContent(question.questionContent);
	}, []);

	const editQuestion = () => {
		const newQuestion = {
			title,
			content,
		};
		axios.patch(
			`/questions/${targetId}/${userId}`,
			JSON.stringify(newQuestion),
			{
				headers: {
					'Content-Type': `application/json`,
				},
			},
		);
	};

	const titleHandler = (e) => {
		setTitle(e.target.value);
	};
	// 글 수정 버튼 클릭시 서버로 전달
	const editHandler = (event) => {
		event.preventDefault();
		if (window.confirm('글을 수정하시겠습니까?')) {
			editQuestion();
			alert('수정하였습니다.');
			navigate(-1, { replace: true });
		} else {
			alert('취소합니다.');
		}
	};

	// cancel 버튼 클릭시 이전 페이지 이동
	const cancelHandler = () => {
		navigate(-1, { replace: true });
	};

	return (
		<EditQuestionContainer>
			<main>
				<EditQnABox>
					<TitleContainer>
						<span>Title</span>
						<input value={title} onChange={titleHandler} />
					</TitleContainer>
					<BodyContainer>
						<span>Body</span>
						<ReactQuill theme="snow" value={content} onChange={setContent} />
					</BodyContainer>

					{/* <PreviewContainer dangerouslySetInnerHTML={{ __html: body }} /> */}
					<div className="button__container">
						<button type="submit" onClick={editHandler}>
							Save edits
						</button>
						<button type="button" className="cancel" onClick={cancelHandler}>
							Cancel
						</button>
					</div>
				</EditQnABox>
			</main>
		</EditQuestionContainer>
	);
}

export default EditQuestion;
