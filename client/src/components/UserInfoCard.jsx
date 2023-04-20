import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserProfile from './UserProfile';

const UserInfoCardContainer = styled.div`
	background-color: var(--main-color-lighten);
	font-size: var(--font-base);
	display: flex;
	width: 200px;
	height: 70px;
	padding: 5px;
	flex-direction: column;
	> span {
		flex: 1;
	}
	.bottom__container {
		flex: 2;
	}
	.user__img {
		width: 32px;
		height: 32px;
		background-color: white;
	}

	.right__container {
		flex: 1;
		margin-left: 5px;
		display: flex;
		flex-direction: column;

		.user__name {
			flex: 1;
			color: var(--main-color);
		}
	}
	.user__activity {
		flex: 1;
		span {
		}
	}
`;

// 유저의 정보가 담긴 InfoCard
function UserInfoCard({ questionData }) {
	return (
		<UserInfoCardContainer>
			<span>{questionData.createdAt}</span>
			<div className="bottom__container">
				{questionData.author && (
					<UserProfile
						userName={questionData.author}
						boxSize="32px"
						fontSize="13px"
					/>
				)}

				<div className="right__container">
					<Link to="/myprofile">
						<span className="user__name">{questionData.author}</span>
					</Link>
					<div className="user__activity">
						<span> 1149</span>
						<span> 5</span>
						<span> 11</span>
					</div>
				</div>
			</div>
		</UserInfoCardContainer>
	);
}
export default UserInfoCard;
