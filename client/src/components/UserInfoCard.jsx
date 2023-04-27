import axios from 'axios';
import { useEffect, useState } from 'react';
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
	const [userId, setUserId] = useState(
		sessionStorage.getItem('loginMemberId')
			? JSON.parse(sessionStorage.getItem('loginMemberId'))
			: null,
	);
	const [memberInfo, setMemberInfo] = useState();

	// 회원정보 조회
	useEffect(() => {
		axios
			.get(`/members/${data.memberId}`, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {
				const info = res.data;
				setMemberInfo(info);
			})
			.catch((res) => {
				console.log(res);
			});
	}, []);

	return (
		memberInfo && (
			<UserInfoCardContainer>
				<span>
					{mode === 'question'
						? `asked ${dateFormat(new Date(data.questionCreatedAt))}`
						: `answered ${dateFormat(new Date(data.answerCreatedAt))}`}
				</span>
				<div className="bottom__container">
					{data.memberId && (
						<UserProfile
							userName={memberInfo.displayName}
							boxSize="32px"
							fontSize="11px"
						/>
					)}

					<div className="right__container">
						<Link
							to={
								userId === data.memberId
									? `/myprofile/${data.memberId}`
									: `/userprofile/${data.memberId}`
							}
						>
							<span className="user__name">{memberInfo.displayName}</span>
						</Link>
					</div>
				</div>
			</UserInfoCardContainer>
		)
	);
}
export default UserInfoCard;
