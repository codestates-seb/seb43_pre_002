import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { dateFormat } from '../utils/dateFormat';
import UserProfile from './UserProfile';

const UserInfoCardContainer = styled.div`
	background-color: var(--main-color-lighten);
	font-size: var(--font-base);
	color: var(--font-color-gray);
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
function UserInfoCard({ data, mode }) {
	return (
		<UserInfoCardContainer>
			<span>
				{mode === 'question'
					? `asked ${dateFormat(new Date(data.questionCreatedAt))}`
					: `answered ${dateFormat(new Date(data.answerCreatedAt))}`}
			</span>
			<div className="bottom__container">
				{data.memberId && (
					<UserProfile
						userName={String(data.memberId)}
						boxSize="32px"
						fontSize="13px"
					/>
				)}

				<div className="right__container">
					<Link to="/myprofile">
						<span className="user__name">{data.memberId}</span>
					</Link>
				</div>
			</div>
		</UserInfoCardContainer>
	);
}
export default UserInfoCard;
