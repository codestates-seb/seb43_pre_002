import styled from 'styled-components';

const LogoImage = styled.img`
	width: 150px;
	margin: 0 10px;
`;

function Logo() {
	return (
		<LogoImage
			src={`${process.env.PUBLIC_URL}/assets/home_logo.png`}
			alt="로고"
		/>
	);
}

export default Logo;
