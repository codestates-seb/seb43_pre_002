import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
	AiFillCaretUp,
	AiFillCaretDown,
	AiOutlineFieldTime,
} from 'react-icons/ai';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';

const IconMenuContainer = styled.ul`
	width: 52px;
	padding: 0px;
	padding-right: 16px;

	li {
		position: relative;
		list-style: none;
		font-size: 17px;
		text-align: center;

		color: var(--font-color-gray);

		> svg {
			font-size: var(--font-base);
			width: 36px;
			height: 36px;
		}
	}
	li:hover {
		> div {
			visibility: visible;
		}
	}
	li:active {
		color: orange;
	}
	.bookmark__icon {
		width: 18px;
		height: 18px;
	}
	.on {
		color: green;
	}
	list-style: none;
`;

const Tooltip = styled.div`
	display: flex;
	text-align: start;
	visibility: hidden;
	position: relative;
	background: white;
	border: 1px solid var(--font-color-gray);
	width: 180px;

	font-size: var(--font-base);
	color: black;
	border-radius: 5px;
	padding: 12px;

	position: absolute;
	z-index: 1;

	top: 50%;
	left: 105%;
	transform: translateY(-50%);
	p {
		flex-basis: 1;
	}
	&:after,
	&:before {
		right: 100%;
		top: 50%;
		border: solid transparent;
		content: '';
		height: 0;
		width: 0;
		position: absolute;
	}

	&:after {
		border-right-color: white;
		border-width: 5px;
		margin-top: -5px;
	}
	//테두리 설정
	&:before {
		border-right-color: var(--font-color-gray);
		border-width: 6px;
		margin-top: -6px;
	}
`;

// QnABox의 IconMenu
function IconMenu({ data, mode }) {
	const [userId, setUserId] = useState(
		localStorage.getItem('loginmemberid')
			? JSON.parse(localStorage.getItem('loginmemberid'))
			: null,
	);

	const [vote, setVote] = useState(
		mode === 'question' ? data.questionVoteCount : data.answerVoteCount,
	);
	const [isBookmark, setIsBookmark] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const { question_id: targetId } = useParams();

	// 추천 증가 기능
	const voteUpHandler = () => {
		// 질문일 경우
		if (mode === 'question') {
			axios
				.post(`/questions/${targetId}/upvote/${userId}`, {
					headers: {
						'Content-Type': `application/json`,
					},
				})
				.then((res) => {
					setVote(vote + 1);
					// console.log(res.data);
				})
				.catch((res) => console.log('투표가 불가합니다.'));
		}
		// 답변일 경우
		else {
			const body = {
				voteType: 'up',
				memberId: userId,
			};
			axios
				.post(`/answers/${data.answerId}/vote`, JSON.stringify(body), {
					headers: {
						'Content-Type': `application/json`,
					},
				})
				.then((res) => {
					if (res.data.success) {
						setVote(vote + 1);
					}
				});
		}
	};

	// 추천 감소 기능
	const voteDownHandler = () => {
		// 질문일 경우
		if (mode === 'question') {
			axios
				.post(`/questions/${targetId}/downvote/${userId}`, {
					headers: {
						'Content-Type': `application/json`,
					},
				})
				.then((res) => {
					setVote(vote - 1);
					// console.log(res.data);
				})
				.catch((res) => console.log('투표가 불가합니다.'));
		} // 답변일 경우
		else {
			const body = {
				voteType: 'down',
				memberId: userId,
			};
			axios
				.post(`/answers/${data.answerId}/vote`, JSON.stringify(body), {
					headers: {
						'Content-Type': `application/json`,
					},
				})
				.then((res) => {
					if (res.data.success) {
						setVote(vote - 1);
					}
				});
		}
	};

	// const isBookmarkHandler = () => {
	// 	setIsBookmark(!isBookmark);
	// 	postBookmark();
	// };

	// 답변 채택 기능(백엔드 구현 필요)
	const isCheckedHadler = () => {
		// setIsChecked(!isChecked);
		axios
			.post(`/answers/${data.answerId}/accept`, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {
				setIsChecked(!isChecked);
				console.log(res);
			});
	};

	return (
		<IconMenuContainer>
			<li>
				<AiFillCaretUp onClick={voteUpHandler} />
				<Tooltip>
					This question shows research effort; it is useful and clear
				</Tooltip>
			</li>
			<li>{vote}</li>
			<li>
				<AiFillCaretDown onClick={voteDownHandler} />
				<Tooltip>Save this question.</Tooltip>
			</li>
			{mode === 'answer' && userId === data.memberId && (
				<li className={isChecked ? 'on' : 'off'}>
					<FaCheck onClick={isCheckedHadler} />
				</li>
			)}
			{/* <li>
				{isBookmark ? (
					<MdBookmarkBorder
						className="bookmark__icon on"
						onClick={isBookmarkHandler}
					/>
				) : (
					<MdBookmark className="bookmark__icon" onClick={isBookmarkHandler} />
				)}

				<Tooltip>Save this question.</Tooltip>
			</li> */}
			<li>
				<Link
					to={`/timeline/${targetId}/${
						mode === 'question' ? 0 : data.answerId
					}`}
				>
					<AiOutlineFieldTime className="timeline__icon" />
				</Link>
				<Tooltip>Show activity on this post.</Tooltip>
			</li>
		</IconMenuContainer>
	);
}

export default IconMenu;
