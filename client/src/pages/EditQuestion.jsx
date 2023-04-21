import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/Header/LoginHeader';

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
`;
const PreviewContainer = styled.div`
	min-height: 100px;
	padding-bottom: 16px;
`;

function EditQuestion() {
	const navigate = useNavigate();

	// 글 수정 버튼 클릭시 서버로 전달
	const editHandler = (e) => {
		e.preventDefault();
		if (window.confirm('글을 수정하시겠습니까?')) {
			alert('수정하였습니다.');
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
			<LoginHeader />
			<main>
				<EditQnABox>
					<TitleContainer>
						<span>Title</span>
						<input />
					</TitleContainer>
					<BodyContainer>
						<span>Body</span>
						<textarea />
					</BodyContainer>
					<PreviewContainer>
						<p>preview</p>
					</PreviewContainer>
					<div className="button__container">
						<button type="submit" onClick={(e) => editHandler(e)}>
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
