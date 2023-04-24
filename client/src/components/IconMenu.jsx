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

	list-style: none;
`;

// QnABox의 IconMenu
function IconMenu() {
	return (
		<IconMenuContainer>
			<li>
				<AiFillCaretUp className="up__icon" />
			</li>
			<li>0</li>
			<li>
				<AiFillCaretDown className="down__icon" />
			</li>
			<li>
				<BiBookmark className="bookmark__icon" />
			</li>
			<li>
				<AiOutlineFieldTime className="timeline__icon" />
			</li>
		</IconMenuContainer>
	);
}

export default IconMenu;
