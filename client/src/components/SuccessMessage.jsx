import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SignButton from './Button/SignButton';

const MessageContainer = styled.div`
	width: 500px;
	height: 200px;
	padding: 28px 0;
	background-color: var(--modal-color);
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	text-align: center;
	h3 {
		font-size: var(--font-title-small);
		font-weight: 600;
		margin-bottom: 30px;
	}
	div {
		font-size: var(--font-base);
		margin-bottom: 30px;
	}
`;

function SuccessMessage() {
	const [currentEmail, setCurrentEmail] = useState('');
	const memberId = JSON.parse(window.localStorage.getItem('signupMemberId'));
	useEffect(() => {
		axios
			.get(`/members/${memberId}`, {
				headers: {
					'Content-Type': 'application/json',
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then((res) => {
				// console.log(res);
				const { email } = res.data;
				setCurrentEmail(email);
			});
	}, []);

	return (
		<MessageContainer>
			<h3>화원가입이 완료되었습니다.</h3>
			<div>
				<p>회원가입을 축하합니다.</p>
				<p>Stack Overflow의 새로운 아이디는 [{currentEmail}] 입니다.</p>
			</div>
			<Link
				to="/login"
				onClick={() => localStorage.removeItem('signupMemberId')}
			>
				<SignButton>Login</SignButton>
			</Link>
		</MessageContainer>
	);
}

export default SuccessMessage;
