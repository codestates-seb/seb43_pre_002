import styled from 'styled-components';
import SignInput from './Input/SignInput';
import SignButton from './Button/SignButton';

const FormContainer = styled.div`
	padding: 24px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

function LoginForm() {
	return (
		<FormContainer>
			<form>
				<SignInput labelFor="email" labelName="Email" inputType="email" />
				<SignInput
					labelFor="password"
					labelName="Password"
					inputType="password"
				/>
				<SignButton>Log in</SignButton>
			</form>
		</FormContainer>
	);
}

export default LoginForm;
