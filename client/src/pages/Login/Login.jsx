import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OAuthButton from '../../components/Button/OAuthButton';
import LoginForm from '../../components/LoginForm';

const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 620.531px;
	height: 100vh;
	width: 100vw;
	background-color: var(--base-color);
`;

const LoginWrapper = styled.div`
	max-width: 290px;
	display: flex;
	flex-direction: column;
	align-items: center;
	> img {
		width: 50px;
		margin-bottom: 30px;
	}
`;

const SignupLink = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	padding: 16px;
	font-size: var(--font-base);
	a {
		color: var(--main-color);
	}
`;

function Login() {
	return (
		<LoginContainer>
			<LoginWrapper>
				<img src={`${process.env.PUBLIC_URL}/assets/main_logo.png`} alt="" />
				<OAuthButton type="button" buttonText="Log in with Google" />
				<LoginForm />
				<SignupLink>
					<span>Already have an account?</span>
					<Link to="/signup">Sign up</Link>
				</SignupLink>
			</LoginWrapper>
		</LoginContainer>
	);
}
export default Login;
