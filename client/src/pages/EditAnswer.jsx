import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditAnswerContainer = styled.div`
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
		margin: 10px 0px;
		margin-right: 10px;
		width: 130px;
		height: 40px;
		background-color: var(--main-color);
		color: white;
		border: none;
	}
	.cancel {
		background-color: white;
		color: var(--main-color);
	}
	.cancel:hover {
		border: var(--main-color) solid 0.1px;
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

function EditAnswer() {
	const navigate = useNavigate();
	const { answer_id: targetId } = useParams();

	const [content, setContent] = useState('');

	// 정보 조회
	useEffect(() => {
		axios
			.get(`/answers/${targetId}`, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {
				const answer = res.data;
				setContent(answer.data.content);
			})
			.catch((res) => {
				console.log('에러발생');
				navigate('/');
			});
	}, []);

	const editAnswer = () => {
		const newAnswer = {
			content,
		};
		axios
			.patch(`/answers/${targetId}`, JSON.stringify(newAnswer), {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => console.log(res.data));
	};

	// 글 수정 버튼 클릭시 서버로 전달
	const editHandler = (event) => {
		event.preventDefault();
		if (window.confirm('글을 수정하시겠습니까?')) {
			editAnswer();
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
		<EditAnswerContainer>
			<main>
				<EditQnABox>
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
		</EditAnswerContainer>
	);
}

export default EditAnswer;
