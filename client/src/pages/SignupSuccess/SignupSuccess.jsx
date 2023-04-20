import styled from 'styled-components';
import SuccessMessage from '../../components/SuccessMessage';

const SignupSuccessContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: var(--base-color);
	> img {
		width: 50px;
		margin-bottom: 30px;
	}
`;

function SignupSuccess() {
	return (
		<SignupSuccessContainer>
			<img src={`${process.env.PUBLIC_URL}/assets/main_logo.png`} alt="" />
			<SuccessMessage />
		</SignupSuccessContainer>
	);
}

export default SignupSuccess;
