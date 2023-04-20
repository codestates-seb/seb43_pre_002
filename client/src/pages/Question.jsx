import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import LoginHeader from '../components/Header/LoginHeader';
import QnABox from '../components/QnABox';

const QuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 50px;
	/* border: black solid 1px; */

	align-items: center;
	width: 100vw;

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
	font-size: var(--font-base);
	span {
		margin-right: 5px;
		color: var(--font-color-gray);
	}

	.second__span {
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
	const [questionData, setQuestionData] = useState({});
	const [answerList, setAnswerList] = useState([]);

	const getQuestionData = () => {
		axios.get('http://localhost:3001/datas').then((res) => {
			setQuestionData(res.data[0]);
			setAnswerList(res.data[0].answers);
		});
	};

	useEffect(() => {
		getQuestionData();
	}, []);

	console.log(answerList);

	return (
		<QuestionContainer>
			<LoginHeader />

			<main>
				<TitleContainer>
					<div className="top__container">
						<span>{questionData && questionData.title}</span>

						<Link to="/myprofile">
							<button type="button">Ask Questions</button>
						</Link>
					</div>
					<div className="bottom__container">
						<div className="info__container">
							<InfoBox>
								<span className="first__span">Asked</span>
								<span className="second__span">{questionData.createdAt}</span>
							</InfoBox>
							<InfoBox>
								<span className="first__span">Modified</span>
								<span className="second__span">{questionData.createdAt}</span>
							</InfoBox>
							<InfoBox>
								<span className="first__span">Viewed</span>
								<span className="second__span">8times</span>
							</InfoBox>
						</div>
					</div>
				</TitleContainer>

				<QnABox questionData={questionData} setQuestionData={setQuestionData} />

				<AnswersContainer>
					<div className="answers__header">
						<span>{`${answerList.length} Answers`}</span>
						<div className="filter__container">
							<span>Sorted by:</span>
							<select>
								<option>Date modified (newest first)</option>
								<option>Date created (oldest first)</option>
							</select>
						</div>
					</div>
					<div>
						{answerList.map((it) => (
							<QnABox
								key={it.id}
								questionData={it}
								setQuestionData={setQuestionData}
							/>
						))}
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
