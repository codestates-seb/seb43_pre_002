import styled from 'styled-components';
import CommentBox from './CommentBox';
import DividerLine from './DividerLine';
import IconList from './IconMenu';
import UserInfoCard from './UserInfoCard';

const QnABoxContainer = styled.div`
	display: flex;

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
`;

// Qusetion, Answer에 사용되는 Div
function QnABox() {
	return (
		<>
			<DividerLine />
			<QnABoxContainer>
				<div className="left__container">
					<IconList />
				</div>
				<div className="right__container">
					<p className="text__container">
						Our app needs to connect to a AWS-Db-Instance but with credentials
						from AWS-auth-credentials. I am getting the credentials but the
						connection call happening before I get the credentials. In below
						NodeJS app, I need to initialize the db variable before the
						authentication.
					</p>

					<div className="bottom__container">
						<div className="function__container">
							<span>copy</span>
							<span>edit</span>
						</div>
						<UserInfoCard />
					</div>
					<CommentBox />
				</div>
			</QnABoxContainer>
		</>
	);
}

export default QnABox;
