import styled from 'styled-components';

const AgreementContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: 6px 0;
	font-size: var(--font-small);
`;

const ErrorMessage = styled.p`
	font-size: var(--font-small);
	color: var(--error-message-color);
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
			{error && <ErrorMessage>{error.message}</ErrorMessage>}
		</AgreementContainer>
	);
}

export default Agreement;
