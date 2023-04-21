import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import SignInput from './Input/SignInput';
import SignButton from './Button/SignButton';
import Agreement from './Agreement';

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

function SignupForm() {
	// const url = 'https://8fe4-118-32-224-80.jp.ngrok.io';

	const onSubmit = (data) => {
		axios
			.post(`/members`, data)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<FormContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				<SignInput
					labelFor="displayName"
					labelName="Display name"
					inputType="text"
					register={register}
					registerOptions={{
						required: 'Display cannot be empty',
					}}
					error={errors.displayName}
				/>
				<SignInput
					labelFor="email"
					labelName="Email"
					inputType="email"
					register={register}
					registerOptions={{
						required: 'Email cannot be empty',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Invalid email format',
						},
					}}
					error={errors.email}
				/>
				<SignInput
					labelFor="password"
					labelName="Password"
					inputType="password"
					register={register}
					registerOptions={{
						required: 'Password cannot be empty',
						minLength: {
							value: 8,
							message: 'Password should have at least 8 characters',
						},
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
							message:
								'Password should contain at least one letter and one number',
						},
					}}
					error={errors.password}
				/>
				<PasswordText>
					Passwords must contain at least eight characters, including at least 1
					letter and 1 number.
				</PasswordText>
				<Agreement
					labelName="회원 가입에 동의합니다."
					labelFor="agreement"
					inputType="checkbox"
					register={register}
					registerOptions={{ required: '회원 가입 약관에 동의해주세요.' }}
					error={errors.agreement}
				/>
				<SignButton type="submit">Sign up</SignButton>
			</form>
		</FormContainer>
	);
}

export default SignupForm;
