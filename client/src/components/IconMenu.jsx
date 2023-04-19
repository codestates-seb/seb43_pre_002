import styled from 'styled-components';
import {
	AiFillCaretUp,
	AiFillCaretDown,
	AiOutlineFieldTime,
} from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';

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
			color: var(--font-color-gray);
			font-size: var(--font-base);
			width: 18px;
			height: 18px;
		}
		.up__icon,
		.down__icon {
			width: 36px;
			height: 36px;
		}
	}
	li:hover {
		> div {
			visibility: visible;
		}
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
function IconMenu() {
	return (
		<IconMenuContainer>
			<li>
				<AiFillCaretUp className="up__icon" />
				<Tooltip>
					This question shows research effort; it is useful and clear
				</Tooltip>
			</li>
			<li>0</li>
			<li>
				<AiFillCaretDown className="down__icon" />
				<Tooltip>Save this question.</Tooltip>
			</li>
			<li>
				<BiBookmark className="bookmark__icon" />
				<Tooltip>Save this question.</Tooltip>
			</li>
			<li>
				<AiOutlineFieldTime className="timeline__icon" />
				<Tooltip>Show activity on this post.</Tooltip>
			</li>
		</IconMenuContainer>
	);
}

export default IconMenu;
