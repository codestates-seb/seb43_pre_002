import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
	AiFillCaretUp,
	AiFillCaretDown,
	AiOutlineFieldTime,
} from 'react-icons/ai';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

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

	list-style: none;
`;

const SelectedIcon = styled(FaCheck)`
	color: ${(props) => (props.isSelected ? 'green' : `var(--font-color-gray);`)};
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
function IconMenu() {
	const [vote, setVote] = useState(0);
	const [isBookmark, setIsBookmark] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const postVote = () => {
		console.log('서버전송');
	};

	const postBookmark = () => {
		console.log('서버 전송');
	};

	const postSelectAnswer = () => {
		console.log('서버 전송');
	};

	const voteUpHandler = () => {
		setVote(vote + 1);
		postVote();
	};

	const voteDownHandler = () => {
		setVote(vote - 1);
		postVote();
	};

	const isBookmarkHandler = () => {
		setIsBookmark(!isBookmark);
		postBookmark();
	};

	const isSelectedHadler = () => {
		setIsSelected(!isSelected);
		postSelectAnswer();
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
			<li>
				<SelectedIcon isSelected={isSelected} onClick={isSelectedHadler} />
			</li>
			<li>
				{isBookmark ? (
					<MdBookmarkBorder
						className="bookmark__icon on"
						onClick={isBookmarkHandler}
					/>
				) : (
					<MdBookmark className="bookmark__icon" onClick={isBookmarkHandler} />
				)}

				<Tooltip>Save this question.</Tooltip>
			</li>
			<li>
				<Link to="/timeline/:id">
					<AiOutlineFieldTime className="timeline__icon" />
				</Link>
				<Tooltip>Show activity on this post.</Tooltip>
			</li>
		</IconMenuContainer>
	);
}

export default IconMenu;
