import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import DividerLine from './DividerLine';
import IconList from './IconMenu';
import UserInfoCard from './UserInfoCard';

const QnABoxContainer = styled.div`
	display: flex;

	.right__container {
		flex: 1;
	}
	.bottom__container {
		margin-top: 12px;

		display: flex;
		justify-content: space-between;
		.function__container {
			span {
				color: var(--line-color);
				margin: 0.2rem;
			}
		}
	}
	.text__container {
		flex: 1;
	}
`;

// Qusetion, Answer에 사용되는 Div
function QnABox({ questionData, setQuestionData }) {
	const [data, setData] = useState(questionData);

	const deleteQnA = () => {
		axios.delete(`http://localhost:3001/datas/${data.id}`);
	};

	const deleteHandler = () => {
		if (window.confirm('삭제하시겠습니까?')) {
			alert('삭제되었습니다.');
		} else {
			alert('취소합니다.');
		}
	};

	return (
		<>
			<DividerLine />
			<QnABoxContainer>
				<div className="left__container">
					<IconList />
				</div>
				<div className="right__container">
					<div
						className="text__container"
						dangerouslySetInnerHTML={{ __html: questionData.bodyHTML }}
					/>
					;
					<div className="bottom__container">
						<div className="function__container">
							<span>copy</span>
							<span>edit</span>
							<span onClick={deleteHandler} aria-hidden="true">
								delete
							</span>
						</div>
						<UserInfoCard questionData={questionData} />
					</div>
					<CommentBox />
				</div>
			</QnABoxContainer>
		</>
	);
}

export default QnABox;
