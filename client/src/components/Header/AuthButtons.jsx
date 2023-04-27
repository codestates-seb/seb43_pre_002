import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignButton from '../Button/SignButton';

const AuthButtonsContainer = styled.div`
	display: flex;
`;

const AuthButton = styled(SignButton)`
	font-size: var(--font-base);
	font-weight: 800;
	width: 70px;
	height: 35px;
	margin: 0 10px;
`;

export default function AuthButtons() {
	return (
		<AuthButtonsContainer>
			<Link to="/login">
				<AuthButton>Log In</AuthButton>
			</Link>
			<Link to="/signup">
				<AuthButton>Sign up</AuthButton>
			</Link>
		</AuthButtonsContainer>
	);
}
