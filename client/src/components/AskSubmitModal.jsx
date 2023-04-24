import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AskSubmitModal({ isOpen, setIsOpen, submitData }) {
	const navegate = useNavigate();
	const closeModalHandler = () => {
		setIsOpen(false);
	};
	const postData = () => {
		axios
			.post('/questions', JSON.stringify(submitData), {
				headers: {
					'Content-Type': `application/json`,
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then(() => navegate('/'));
	};
	return (
		<ModalContainer>
			{isOpen ? (
				<ModalBackdrop onClick={closeModalHandler}>
					<ModalView onClick={(e) => e.stopPropagation()}>
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
	background-color: #e5f3ff; // 전역 변수로 바꾸기
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
`;
