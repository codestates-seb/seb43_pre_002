import styled from 'styled-components';

function AskDetail({ setIsDetailFocus }) {
	return (
		<AskDetailContainer>
			<h5 className="title">What are the details of your problem?</h5>
			<div className="descriptor">
				Introduce the problem and expand on what you put in the title. Minimum
				20 characters.
			</div>
			<div className="input-container">
				<textarea
					className="input-container__detail-input"
					onFocus={() => setIsDetailFocus(true)}
					onBlur={() => setIsDetailFocus(false)}
				/>
			</div>
			<button className="next" type="button">
				Next
			</button>
		</AskDetailContainer>
	);
}

export default AskDetail;

const AskDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 65%;
	height: 300px;
	padding: 1% 1% 1% 2%;
	background-color: white;
	border-radius: 5px;
	border: 1px solid var(--line-color);
	margin-right: 2%;
	.title {
		font-size: var(--font-large);
		font-weight: 700;
		margin: 1% 0;
	}
	.descriptor {
		font-size: var(--font-base);
		margin-bottom: 0.5%;
	}
	.input-container {
		width: 100%;
		height: 200px;
		margin-bottom: 1%;
	}
	.input-container__detail-input {
		width: 100%;
		height: 100%;
	}
	.next {
		color: white;
		background-color: var(--main-color);
		width: 6%;
		height: 2em;
		&:hover {
			background-color: #3b6fa0; // 전역변수로 바꾸기
		}
		cursor: pointer;
	}
`;
