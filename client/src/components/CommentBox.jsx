import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DividerLine from './DividerLine';

const CommentContainer = styled.div`
	font-size: var(--font-base);
	margin: 10px 0px;
	span {
		margin-right: 5px;
	}
	.user__name {
		color: var(--main-color);
	}
	.created__time {
		color: var(--line-color);
	}
`;

const NewCommentContainer = styled.div`
	font-size: var(--font-base);
	color: var(--line-color);

	.comment__form {
		display: flex;
		padding: 10px 20px;

		.left__container {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-right: 10px;
			textarea {
				margin-bottom: 10px;
				height: 100px;
			}
		}
		button {
			background-color: var(--main-color);
			font-size: var(--font-base);
			color: white;
			width: 100px;
			height: 45px;
			border: none;
		}
	}
`;

// Comment 출력시 사용되는 컴포넌트
function CommentBox({ answerId }) {
	const [isWrite, setIsWrite] = useState(false);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');

	// 댓글 조회(백엔드 구현 필요)
	useEffect(() => {
		axios
			.get(`/comments`, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {
				const totalComments = res.data.data;

				setComments(totalComments.filter((it) => it.answerId === answerId));
			})
			.catch((res) => {
				console.log(res);
			});
	}, []);

	// 댓글 생성
	const createCommentHandler = () => {
		const body = {
			content: newComment,
		};
		axios
			.post(`/answers/${answerId}/comment`, JSON.stringify({ ...body }), {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {})
			.catch((res) => console.log(res));
	};

	const commentHandler = (event) => {
		setNewComment(event.target.value);
	};

	const isWriteHandler = () => {
		setIsWrite(!isWrite);
	};

	const postComment = () => {
		console.log('comment보내기');
	};

	// 새로운 커멘트 작성
	const postCommentHandler = (e) => {
		e.preventDefault();
		if (window.confirm('댓글을 작성하겠습니까?')) {
			postComment();
			isWriteHandler();
			setNewComment('');
			setComments([...comments, newComment]);
			alert('작성되었습니다.');
		} else {
			alert('취소합니다.');
		}
	};

	return (
		<CommentContainer>
			{comments.map((it, idx) => (
				<div key={1}>
					<p>
						{it} –
						<Link to="/myprofile">
							<span className="user__name">ashughes Jun</span>
						</Link>
						<span className="created__time">{String(new Date())}</span>
					</p>
					<DividerLine />
				</div>
			))}

			<NewCommentContainer>
				{isWrite ? (
					<form className="comment__form">
						<div className="left__container">
							<textarea onChange={commentHandler} maxLength="500" />
							<span>{`${Number(
								500 - newComment.length,
							)} characters left`}</span>
						</div>
						<button
							type="submit"
							onClick={(e) => {
								postCommentHandler(e);
							}}
						>
							Add comment
						</button>
					</form>
				) : (
					<span
						className="create__comment"
						onClick={isWriteHandler}
						aria-hidden="true"
					>
						Add a comment
					</span>
				)}
			</NewCommentContainer>
		</CommentContainer>
	);
}

export default CommentBox;
