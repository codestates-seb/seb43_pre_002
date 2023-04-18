import styled from 'styled-components';
import OAuthButton from '../../components/Button/OAuthButton';
import LoginForm from './LoginForm';

const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
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
					{/* 링크 컴포넌트로 수정해야 함 */}
					<a href="/users/signup?ssrc=head">Sign up</a>
				</SignupLink>
			</LoginWrapper>
		</LoginContainer>
	);
}
export default Login;
