import { useState } from 'react';
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

function CommentBox() {
	const [isWrite, setIsWrite] = useState(false);

	const isWriteHandler = () => {
		setIsWrite(!isWrite);
	};

	return (
		<CommentContainer>
			<p>
				Personally, I think the easiest and most widely useful solution is that
				the Play Store should report purchases from all Google accounts for the
				current user that are signed in on the device. –
				<span className="user__name">ashughes Jun</span>
				<span className="created__time">6, 2017 at 19:13</span>
			</p>
			<DividerLine />

			<NewCommentContainer>
				{isWrite ? (
					<form className="comment__form">
						<div className="left__container">
							<textarea />
							<span>497 characters left</span>
						</div>
						<button
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								isWriteHandler();
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
