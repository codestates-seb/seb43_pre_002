import styled from 'styled-components';

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
	}
`;

function SignInput({ labelName, labelFor, inputType }) {
	return (
		<InputContainer>
			<label htmlFor={labelFor}>{labelName}</label>
			<input type={inputType} name={labelFor} id={labelFor} required />
		</InputContainer>
	);
}

export default SignInput;
