import styled from 'styled-components';
import { AiFillExclamationCircle } from 'react-icons/ai';

const AgreementContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: 6px 0;
	font-size: var(--font-small);
	input {
		margin-left: 0;
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

function Agreement({
	labelName,
	labelFor,
	inputType,
	register,
	registerOptions,
	error,
}) {
	return (
		<AgreementContainer>
			<input
				type={inputType}
				name={labelFor}
				id={labelFor}
				{...register(labelFor, registerOptions)}
			/>
			<label htmlFor={labelFor}>{labelName}</label>
			{error && (
				<ErrorMessage>
					<ErrorIcon />
					{error.message}
				</ErrorMessage>
			)}
		</AgreementContainer>
	);
}

export default Agreement;
