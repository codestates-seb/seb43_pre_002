import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OAuthButton from '../../components/Button/OAuthButton';
import JoinDescription from '../../components/JoinDescription';
import SignupForm from '../../components/SignupForm';
import LoginHeader from '../../components/Header/LoginHeader';

const SignupContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 620.531px;
	height: 100%;
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
	font-size: var(--font-base);
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
					<Link to="/login">Log In</Link>
				</LoginLink>
			</SignupWrapper>
		</SignupContainer>
	);
}

export default Signup;
