import styled from 'styled-components';
import SignInput from '../../components/Input/SignInput';
import SignButton from '../../components/Button/SignButton';

const FormContainer = styled.div`
	padding: 24px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

const PasswordText = styled.p`
	font-size: var(--font-small);
	color: #727981;
`;

const Agreement = styled.div`
	display: flex;
	align-items: center;
	margin: 6px 0;
	font-size: var(--font-small);
`;

function SignupForm() {
	return (
		<FormContainer>
			<form>
				<SignInput
					labelFor="display-name"
					labelName="Display name"
					inputType="text"
				/>
				<SignInput labelFor="email" labelName="Email" inputType="email" />
				<SignInput
					labelFor="password"
					labelName="Password"
					inputType="password"
				/>
				<PasswordText>
					Passwords must contain at least eight characters, including at least 1
					letter and 1 number.
				</PasswordText>
				<Agreement>
					<div>
						<input type="checkbox" name="agreement" id="agreement" />
					</div>
					<div>
						{/* label input 연결 했음에도 오류 발생하여 해당 line eslint 무시 */}
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
						<label htmlFor="agreement">회원 가입에 동의합니다.</label>
					</div>
				</Agreement>
				<SignButton>Sign up</SignButton>
			</form>
		</FormContainer>
	);
}

export default SignupForm;
