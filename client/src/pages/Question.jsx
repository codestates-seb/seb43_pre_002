import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginHeader from '../components/Header/LoginHeader';
import QnABox from '../components/QnABox';
import AnswerForm from '../components/AnswerForm';

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
	const { question_id: targetId } = useParams();
	const [questionData, setQuestionData] = useState(null);
	const [answerList, setAnswerList] = useState([]);

	const navigate = useNavigate();

	// 질문 조회 및 답변 조회(완료)
	useEffect(() => {
		axios
			.get(`/questions/${targetId}`, {
				headers: {
					'Content-Type': `application/json`,
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then((res) => {
				const question = res.data;
				setQuestionData(question.data);
				setAnswerList(question.data.answers);
			})
			.catch((res) => {
				console.log('에러발생');
				navigate('/');
			});
	}, []);

	// 질문 삭제(백엔드 구현 필요)
	const deleteQuestionHandler = (data) => {
		axios.delete(`/questions/${targetId}`).then((res) => {
			setQuestionData({});
			navigate('/');
		});
	};

	// 답변 생성
	const createAnswerHandler = (data) => {
		axios
			.post(`/questions/${targetId}/answers`, JSON.stringify({ ...data }), {
				headers: {
					'Content-Type': `application/json`,
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then((res) => {
				navigate(0);
			});
	};

	// 답변 삭제
	const deleteAnswerHandler = (data) => {
		axios
			.delete(`/answers/${data.answerId}`)
			.then((res) =>
				setAnswerList(answerList.filter((it) => it.answerId !== data.answerId)),
			);
	};

	return (
		<QuestionContainer>
			<LoginHeader />

			<main>
				{questionData && (
					<>
						<TitleContainer>
							<div className="top__container">
								<span>{questionData.questionTitle}</span>

								<Link to="/myprofile">
									<button type="button">Ask Questions</button>
								</Link>
							</div>
							<div className="bottom__container">
								<div className="info__container">
									<InfoBox>
										<span className="first__span">Asked</span>
										<span className="second__span">
											{questionData.questionCreatedAt}
										</span>
									</InfoBox>
									<InfoBox>
										<span className="first__span">Modified</span>
										<span className="second__span">
											{questionData.questionModifiedAt}
										</span>
									</InfoBox>
									<InfoBox>
										<span className="first__span">Viewed</span>
										<span className="second__span">
											{questionData.questionViewCount}
										</span>
									</InfoBox>
								</div>
							</div>
						</TitleContainer>

						<QnABox
							data={questionData}
							deleteQuestionHandler={deleteQuestionHandler}
							deleteAnswerHandler={deleteAnswerHandler}
							mode="question"
						/>
					</>
				)}
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
						{answerList.map((it) => {
							return (
								<QnABox
									key={it.answerId}
									data={it}
									deleteQuestionHandler={deleteQuestionHandler}
									deleteAnswerHandler={deleteAnswerHandler}
									mode="answer"
								/>
							);
						})}
					</div>
				</AnswersContainer>
				<AnswerForm createAnswerHandler={createAnswerHandler} />
			</main>
		</QuestionContainer>
	);
}

export default Question;
