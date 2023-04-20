import styled from 'styled-components';
import QnABox from '../components/QnABox';

const QuestionContainer = styled.div`
	display: flex;
	flex-direction: column;

	/* border: black solid 1px; */

	align-items: center;
	width: 100vw;

	header {
		width: 100%;
		background-color: var(--main-color);
	}
	main {
		padding: 24px;
		display: flex;
		flex-direction: column;
		/* border: black solid 1px; */
		flex: 1;
		width: 80vw;
	}
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;

	.top__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;

		span {
			font-size: var(--font-title-large);
		}
		button {
			background-color: var(--main-color);
			font-size: var(--font-base);
			color: white;
			width: 100px;
			height: 45px;
			border: none;
		}
	}

	.bottom__container {
		display: flex;
		align-items: center;
	}

	.info__container {
		display: flex;
	}
`;

const InfoBox = styled.div`
	margin-right: 10px;

	span {
		margin-right: 0.2rem;
		color: var(--font-color-gray);
	}

	.second__span {
		font-weight: bold;
		color: black;
	}
`;

const AnswerForm = styled.form`
	display: flex;
	flex-direction: column;

	> span {
		margin: 20px 0px;
		font-size: var(--font-title-small);
	}
	> textarea {
		height: 100px;
	}
	button {
		margin: 10px 0px;
		width: 130px;
		height: 40px;
		background-color: var(--main-color);
		color: white;
		border: none;
	}
`;

const AnswersContainer = styled.div`
	margin-top: 20px;
	.answers__header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
		> span {
			font-size: var(--font-title-small);
		}
	}
	.filter__container {
		font-size: var(--font-base);
		display: flex;
		align-items: center;
	}
`;

function Question() {
	return (
		<QuestionContainer>
			<header>헤더</header>
			<main>
				<TitleContainer>
					<div className="top__container">
						<span>
							Type error pass dynamic generic type to forwardRef React
							TypeScript
						</span>

						<button type="button">Ask Questions</button>
					</div>
					<div className="bottom__container">
						<div className="info__container">
							<InfoBox>
								<span className="first__span">Asked</span>
								<span className="second__span">Today</span>
							</InfoBox>
							<InfoBox>
								<span className="first__span">Modified</span>
								<span className="second__span">Today</span>
							</InfoBox>
							<InfoBox>
								<span className="first__span">Viewed</span>
								<span className="second__span">8times</span>
							</InfoBox>
						</div>
					</div>
				</TitleContainer>

				<QnABox />

				<AnswersContainer>
					<div className="answers__header">
						<span>2 Answer</span>
						<div className="filter__container">
							<span>Sorted by:</span>
							<select>
								<option>Date modified (newest first)</option>
								<option>Date created (oldest first)</option>
							</select>
						</div>
					</div>
					<div>
						<QnABox />
						<QnABox />
					</div>
				</AnswersContainer>

				<AnswerForm>
					<span>Your Answer</span>
					<textarea />
					<div className="bottom__container">
						<button type="submit">Post Your Answer</button>
					</div>
				</AnswerForm>
			</main>
		</QuestionContainer>
	);
}

export default Question;
