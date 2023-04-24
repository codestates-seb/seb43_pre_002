/* eslint-disable no-underscore-dangle */
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

function LoginForm({ setIsLogin, setLoginError }) {
	const navigate = useNavigate();

	const onSubmit = async (inputData) => {
		const loginInfo = {
			email: inputData.email,
			password: inputData.password,
		};
		await axios
			.post(`/auth/login`, loginInfo) // package.json proxy url 확인
			.then((response) => {
				// console.log(response);
				const accessToken = response.headers.authorization.split(' ')[0];
				const localAccessToken = localStorage.getItem('access_token');
				if (!localAccessToken) {
					localStorage.setItem('access_token', accessToken); // 로그아웃 시 removeItem
				}
				axios.defaults.headers.common.Authorization = `Bearer ${localAccessToken}`;
				return response.data;
			})
			.then((data) => {
				localStorage.setItem('loginMemberId', JSON.stringify(data.memberId)); // 로그인한 멤버 memberId를 로컬 스토리지에 저장
				setIsLogin(true);
				navigate(`/`);
			})
			.catch((error) => {
				setLoginError(
					'로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
				);
				// console.log(error.response.data);
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
			</form>
		</FormContainer>
	);
}

export default LoginForm;
