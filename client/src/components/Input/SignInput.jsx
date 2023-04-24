import styled from 'styled-components';
import { AiFillExclamationCircle } from 'react-icons/ai';

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px 0;
	label {
		margin: 2px 0;
		font-size: var(--font-large);
		font-weight: 600;
	}
	input {
		margin: 2px 0;
		border-radius: 3px;
		height: 30px;
		border: 1px solid var(--line-color);
		&:focus {
			outline: none;
			border: 2px solid var(--main-color);
		}
	}
	input.error {
		border-color: var(--error-message-color);
		&:focus {
			border: 2px solid var(--error-message-color);
		}
	}
`;

const ErrorMessage = styled.p`
	margin-top: 1px;
	display: flex;
	align-items: center;
	font-size: var(--font-small);
	color: var(--error-message-color);
`;

const ErrorIcon = styled(AiFillExclamationCircle)`
	margin-right: 5px;
`;

function SignInput({
	labelName,
	labelFor,
	inputType,
	register,
	registerOptions,
	error,
}) {
	return (
		<InputContainer>
			<label htmlFor={labelFor}>{labelName}</label>
			<input
				className={error ? 'error' : ''}
				type={inputType}
				name={labelFor}
				id={labelFor}
				{...register(labelFor, registerOptions)}
			/>
			{error && (
				<ErrorMessage>
					<ErrorIcon />
					{error.message}
				</ErrorMessage>
			)}
		</InputContainer>
	);
}

export default SignInput;
