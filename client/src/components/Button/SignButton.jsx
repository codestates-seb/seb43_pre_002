import styled from 'styled-components';

const SignButton = styled.button`
	width: 240px;
	height: 37px;
	margin: 6px 0;
	background: var(--main-color);
	box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.25);
	border-radius: 5px;
	color: #fff;
	border: none;
	cursor: pointer;
	&:hover {
		background-color: #3b6fa0;
	}
`;

export default SignButton;
