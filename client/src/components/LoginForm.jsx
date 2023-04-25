/* eslint-disable no-underscore-dangle */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
// import CryptoJS from 'crypto-js';
import { AiFillExclamationCircle } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import { setIsLogin } from '../reducers/loginSlice';
import SignInput from './Input/SignInput';
import SignButton from './Button/SignButton';

const FormContainer = styled.div`
	padding: 24px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
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

function LoginForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState(null);

	const onSubmit = (inputData) => {
		// const cipherPassword = CryptoJS.AES.encrypt(
		// 	inputData.password,
		// 	process.env.REACT_APP_SECRET_KEY,
		// ).toString();
		const loginInfo = {
			email: inputData.email,
			password: inputData.password,
			// password: cipherPassword, // 서버와 함께 해시화 해야 함
		};
		// const bytes = CryptoJS.AES.decrypt(
		// 	cipherPassword,
		// 	process.env.REACT_APP_SECRET_KEY,
		// ).toString(CryptoJS.enc.Utf8);
		// console.log('입력한 패스워드: ', inputData.password);
		// console.log('암호화 패스워드: ', cipherPassword);
		// console.log('복호화 패스워드: ', bytes);
		axios
			.post(`/auth/login`, loginInfo) // package.json proxy url 확인
			.then((response) => {
				setLoginError(null);
				const accessToken = response.headers.authorization.split(' ')[1];
				const expiresInSec =
					parseInt(response.headers['access-token-expiration-minutes'], 10) *
					60;
				localStorage.setItem('access_token', accessToken);
				localStorage.setItem(
					'loginMemberId',
					JSON.stringify(response.data.memberId),
				); // 로그인한 멤버 memberId를 로컬 스토리지에 저장
				localStorage.setItem('expires_in', expiresInSec);
				dispatch(setIsLogin(true));
				setLoginError(null);
				navigate(`/`);
			})
			.catch((error) => {
				setLoginError(
					'로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
				);
				console.log(error);
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
					}}
					error={errors.password}
				/>
				<SignButton>Log in</SignButton>
				{loginError && (
					<ErrorMessage>
						<ErrorIcon />
						{loginError}
					</ErrorMessage>
				)}
			</form>
		</FormContainer>
	);
}

export default LoginForm;
