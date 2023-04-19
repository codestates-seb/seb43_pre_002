import styled from 'styled-components';
import SignButton from '../Button/SignButton';
import SearchBar from '../Input/SearchBar';
// import { Link } from 'react-router-dom';

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	width: 100%;
	padding: 0 20px;
	background-color: #eee;
	box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.25);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`;

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	max-width: 100%;
	height: 100%;
	margin: 0 auto;
`;

// const LogoLink = styled(Link)`
// 	display: block;
// 	width: 100px;
// `;

const LogoImage = styled.img`
	width: 150px;
	margin: 0 10px;
`;

const AuthButtons = styled.div`
	display: flex;
`;

const AuthButton = styled(SignButton)`
	font-size: var(--font-base);
	font-weight: 800;
	width: 70px;
	height: 35px;
	margin: 0 10px;
`;

// const AuthLink = styled(Link)`
// 	display: inline-block;
// 	margin-left: 10px;
// 	padding: 5px 10px;
// 	border-radius: 5px;
// 	background-color: var(--main-color);
// 	color: #fff;
// 	text-decoration: none;

// 	&:hover {
// 		background-color: var(--button-hover-color);
// 	}
// `;

function LoginHeader() {
	return (
		<Header>
			<HeaderContainer>
				{/* <LogoLink to="/"> */}
				<LogoImage
					src={`${process.env.PUBLIC_URL}/assets/home_logo.png`}
					alt="로고"
				/>
				{/* </LogoLink> */}
				<SearchBar type="text" placeholder="검색어를 입력하세요." />
				<AuthButtons>
					<AuthButton>Log In</AuthButton>
					<AuthButton>Sign up</AuthButton>
				</AuthButtons>
				{/* <AuthButtons>
				<AuthLink to="/login">Log In</AuthLink>
				<AuthLink to="/signup">Sign up</AuthLink>
			</AuthButtons> */}
			</HeaderContainer>
		</Header>
	);
}

export default LoginHeader;
