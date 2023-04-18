import styled from 'styled-components';

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px 25px;
	input {
		border-radius: 3px;
		height: 30px;
	}
`;

function SignInput({ labelName, labelFor, inputType }) {
	return (
		<InputContainer>
			<label htmlFor={labelFor}>{labelName}</label>
			<input type={inputType} name={labelFor} required />
		</InputContainer>
	);
}

export default SignInput;
