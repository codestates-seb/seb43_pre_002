import styled from 'styled-components';
import SignInput from '../../components/Input/SignInput';
// import PasswordInput from '../../components/Input/PasswordInput';

const SignupWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

function Signup() {
	return (
		<SignupWrapper>
			<div>
				<ul>
					<h1>Join the Stack Overflow community</h1>
					<li>Get unstuck — ask a question</li>
					<li>Unlock new privileges like voting and commenting</li>
					<li>Save your favorite questions, answers, watch tags, and more</li>
					<li>Earn reputation and badges</li>
				</ul>
			</div>
			<div>
				<div>
					<button type="button">Sign up with Google</button>
				</div>
				<div>
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
					<p>
						Passwords must contain at least eight characters, including at least
						1 letter and 1 number.
					</p>
				</div>
			</div>
		</SignupWrapper>
	);
}

export default Signup;
