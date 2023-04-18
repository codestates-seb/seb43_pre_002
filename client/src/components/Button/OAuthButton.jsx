import styled from 'styled-components';

const ButtonWrapper = styled.button`
	margin-bottom: 15px;
	width: 100%;
	height: 37px;
	border: 1px solid var(--line-color);
	border-radius: 5px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: #f8f9f9;
	}
	img {
		width: 18px;
	}
	button {
		border: none;
		background-color: transparent;
		font-size: var(--font-base);
	}
`;

function OAuthButton({ buttonText }) {
	return (
		<ButtonWrapper>
			<img
				src={`${process.env.PUBLIC_URL}/assets/google_logo_icon.png`}
				alt=""
			/>
			<button type="button">{buttonText}</button>
		</ButtonWrapper>
	);
}

export default OAuthButton;
