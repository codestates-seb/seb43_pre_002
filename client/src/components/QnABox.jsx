import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
function QnABox({ data, deleteQuestionHandler, deleteAnswerHandler, mode }) {
	const deleteButtonHandler = () => {
		if (window.confirm('삭제하시겠습니까?')) {
			if (mode === 'question') {
				deleteQuestionHandler(data);
			} else {
				deleteAnswerHandler(data);
			}
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
					<IconList data={data} mode={mode} />
				</div>
				<div className="right__container">
					<div
						className="text__container"
						dangerouslySetInnerHTML={{
							__html:
								mode === 'question' ? data.questionContent : data.answerContent,
						}}
					/>

					<div className="bottom__container">
						<div className="function__container">
							<span>copy</span>
							<Link
								to={`/edit/${
									mode === 'question'
										? `question/${data.questionId}`
										: `answer/${data.answerId}`
								}`}
							>
								<span>edit</span>
							</Link>
							<span onClick={deleteButtonHandler} aria-hidden="true">
								delete
							</span>
						</div>
						<UserInfoCard data={data} mode={mode} />
					</div>
					<CommentBox />
				</div>
			</QnABoxContainer>
		</>
	);
}

export default QnABox;
