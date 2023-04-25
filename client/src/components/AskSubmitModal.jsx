import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function AskSubmitModal({ isOpen, setIsOpen, submitData }) {
	const [resultText, setResultText] = useState('제출 완료되었습니다.');
	const [isResultOpen, setIsResultOpen] = useState(false);
	const navigate = useNavigate();
	const closeModalHandler = () => {
		setIsOpen(false);
	};
	const postData = () => {
		const memberId = localStorage.getItem('loginMemberId');
		axios
			.post(`/questions/${memberId}`, JSON.stringify(submitData), {
				headers: {
					'Content-Type': `application/json`,
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then(() => setResultText('제출 완료되었습니다.'))
			.then(() => {
				setIsResultOpen(true);
				setTimeout(() => {
					setIsResultOpen(false);
					navigate('/');
				}, 1000);
			})
			.catch(() => {
				setResultText('제출에 실패했습니다. 잠시 후 다시 시도해주세요.');
				setIsResultOpen(true);
				setTimeout(() => {
					setIsResultOpen(false);
					setIsOpen(false);
				}, 1000);
			});
	};
	return (
		<ModalContainer>
			{isOpen ? (
				<ModalBackdrop onClick={closeModalHandler}>
					<ModalView onClick={(e) => e.stopPropagation()}>
						{isResultOpen ? (
							<p className="result-text">{resultText}</p>
						) : (
							<>
								<p className="modal-text">제출하시겠습니까?</p>
								<div className="button-container">
									<button
										className="button-container__button"
										type="button"
										onClick={postData}
									>
										Yes
									</button>
									<button
										className="button-container__button"
										type="button"
										onClick={closeModalHandler}
									>
										Cancel
									</button>
								</div>
							</>
						)}
					</ModalView>
				</ModalBackdrop>
			) : null}
		</ModalContainer>
	);
}

export default AskSubmitModal;

const ModalContainer = styled.div`
	display: flex;
`;

const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background: rgba(128, 128, 128, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	z-index: 99;
`;

const ModalView = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--modal-color);
	width: 30%;
	height: 25%;
	color: black;
	box-shadow: 2px 3px 5px 0;
	border-radius: 5px;
	.modal-text {
		font-size: var(--font-title-small);
		font-weight: 700;
		margin-bottom: 5%;
	}
	.button-container {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.button-container__button {
		font-size: var(--font-large);
		color: white;
		background-color: var(--main-color);
		margin: 0 5%;
		width: 100px;
		height: 40px;
		border-radius: 5px;
		cursor: pointer;
	}
	.result-text {
		font-weight: 700;
	}
`;
