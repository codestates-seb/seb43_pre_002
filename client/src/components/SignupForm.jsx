import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import CryptoJS from 'crypto-js';
import styled from 'styled-components';
import axios from 'axios';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { useState } from 'react';
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

function SignupForm() {
	const [signupError, setSignupError] = useState(null);
	const navigate = useNavigate();
	const onSubmit = (inputData) => {
		// const cipherPassword = CryptoJS.AES.encrypt(
		// 	inputData.password,
		// 	process.env.REACT_APP_SECRET_KEY,
		// ).toString();
		const userInfo = {
			displayName: inputData.displayName,
			email: inputData.email,
			password: inputData.password,
			// password: cipherPassword, // 서버와 함께 해시화 해야 함
		};
		// 복호화 테스트
		// const bytes = CryptoJS.AES.decrypt(
		// 	cipherPassword,
		// 	process.env.REACT_APP_SECRET_KEY,
		// ).toString(CryptoJS.enc.Utf8);
		// console.log('입력한 패스워드: ', inputData.password);
		// console.log('암호화 패스워드: ', cipherPassword);
		// console.log('복호화 패스워드: ', bytes);
		axios
			.post(`/members`, userInfo)
			.then((response) => {
				// console.log('가입 성공: ', response.data);
				const { memberId } = response.data;
				window.localStorage.setItem('signupMemberId', JSON.stringify(memberId)); // 가입한 멤버 memberId를 로컬 스토리지에 저장
				navigate('/signupsuccess');
				setSignupError(null);
			})
			.catch((error) => {
				console.log(error.response.status);
				if (error.response.status === 409) {
					setSignupError(
						'이메일이 중복되었습니다. 다른 이메일을 사용해주세요.',
					);
				} else {
					alert(
						'서버 오류로 불편을 드려 죄송합니다. 잠시 후에 다시 시도해주세요. 😅',
					);
				}
			});
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
				{signupError && (
					<ErrorMessage>
						<ErrorIcon />
						{signupError}
					</ErrorMessage>
				)}
			</form>
		</FormContainer>
	);
}

export default SignupForm;
