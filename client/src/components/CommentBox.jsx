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
`;

// Comment 출력시 사용되는 컴포넌트

function CommentBox() {
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
				<span>Add a comment</span>
			</NewCommentContainer>
		</CommentContainer>
	);
}

export default CommentBox;
