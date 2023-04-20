import styled from 'styled-components';

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
function UserInfoCard() {
	return (
		<UserInfoCardContainer>
			<span>asked 45 mins ago</span>
			<div className="bottom__container">
				<div className="user__img">img</div>
				<div className="right__container">
					<span className="user__name">Amr Eraky</span>
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
