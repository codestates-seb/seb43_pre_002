import styled from 'styled-components';
import OAuthButton from '../../components/Button/OAuthButton';
import JoinDescription from './JoinDescription';
import SignupForm from './SignupForm';

const SignupContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: var(--base-color);
`;

const SignupWrapper = styled.div`
	max-width: 290px;
`;

const LoginLink = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	padding: 16px;
	a {
		color: var(--main-color);
	}
`;

function Signup() {
	return (
		<SignupContainer>
			<JoinDescription />
			<SignupWrapper>
				<OAuthButton type="button" buttonText="Sign up with Google" />
				<SignupForm />
				<LoginLink>
					<span>Already have an account?</span>
					{/* 링크 컴포넌트로 수정해야 함 */}
					<a href="/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f">
						Log in
					</a>
				</LoginLink>
			</SignupWrapper>
		</SignupContainer>
	);
}

export default Signup;
