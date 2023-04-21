import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SignInput from './Input/SignInput';
import SignButton from './Button/SignButton';

const FormContainer = styled.div`
	padding: 24px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

function LoginForm({
	isLogin,
	setIsLogin,
	userInfo,
	setUserInfo,
	setLoginError,
}) {
	const navigate = useNavigate();

	const onSubmit = (data) => {
		// navigate('/');

		axios
			.post(`/auth/login`, data) // package.json proxy url 확인
			.then((response) => {
				// console.log(response);
				const { accessToken } = response.data;
				localStorage.setItem('accessToken', accessToken); // 로그아웃 시 removeItem
				setIsLogin(true);
				setUserInfo(response.data);
				setLoginError(null);
				navigate('/');
				// ! 서버 측과 로그인 인증 방식: JWT
			})
			.catch((error) => {
				setLoginError(
					'로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
				);
				console.log(error.response.data);
			});
	};
	// 로그인 후 JWT가 있으면 모든 axios 요청에 토큰을 전송하는 인터셉터 설정
	// axios.interceptors.request.use((config) => {
	// 	if (token) {
	// 		config.headers.Authorization = `Bearer ${token}`;
	// 	}
	// 	return config;
	// });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<FormContainer>
			{isLogin ? (
				<div>{userInfo}</div>
			) : (
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
				</form>
			)}
		</FormContainer>
	);
}

export default LoginForm;
