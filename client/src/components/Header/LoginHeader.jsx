import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignButton from '../Button/SignButton';
import SearchBar from '../Input/SearchBar';
import Logo from './Logo';

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

function LoginHeader() {
	return (
		<Header>
			<HeaderContainer>
				<Link to="/">
					<Logo />
				</Link>
				<SearchBar type="text" placeholder="검색어를 입력하세요." />
				<AuthButtons>
					<Link to="/login">
						<AuthButton>Log In</AuthButton>
					</Link>
					<Link to="/signup">
						<AuthButton>Sign up</AuthButton>
					</Link>
				</AuthButtons>
			</HeaderContainer>
		</Header>
	);
}

export default LoginHeader;
