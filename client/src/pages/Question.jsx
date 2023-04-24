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
	// const apiUrl = 'https://caa6-183-97-142-84.ngrok-free.app/questions/1';
	const { question_id: targetId } = useParams();
	const [questionData, setQuestionData] = useState(null);
	const [answerList, setAnswerList] = useState([]);

	const navigate = useNavigate();

	// 질문 조회
	useEffect(() => {
		axios.get('http://localhost:3001/questions').then((res) => {
			const questions = res.data;
			const target = questions.find(
				(it) => it.question_id === Number(targetId),
			);

			if (target) {
				setQuestionData(target);
			} else {
				navigate('/');
			}
		});
		// axios.get(apiUrl).then((res) => console.log(res));
		//	axios.get(`/questions/1`).then((res) => console.log(res));

		// axios
		// 	.get('/answers/1', {
		// 		headers: {
		// 			'Content-Type': `application/json`,
		// 			'ngrok-skip-browser-warning': '69420',
		// 		},
		// 	})
		// 	.then((res) => console.log(res.data));
	}, [answerList]);

	// 질문 수정
	const updateQuestionHandler = (data) => {
		axios
			.put(
				`http://localhost:3001/questions${data.id}`,
				{ ...data },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => setQuestionData(data));
	};

	// 질문 삭제
	const deleteQuestionHandler = (data) => {
		axios.delete(`http://localhost:3001/questions/${data.id}`).then((res) => {
			setQuestionData({});
			navigate('/');
		});
	};

	// 답변 조회
	useEffect(() => {
		axios.get('http://localhost:3001/answers').then((res) => {
			const answers = res.data;
			const targetAnswer = answers.filter(
				(it) => it.question_id === Number(targetId),
			);
			if (targetAnswer) {
				setAnswerList(targetAnswer);
			}
		});
	}, []);

	// 답변 생성
	const createAnswerHandler = (data) => {
		axios
			.post(
				'http://localhost:3001/answers',
				{
					...data,
					id: answerList[answerList.length - 1].answer_id + 1,
					answer_id: answerList[answerList.length - 1].answer_id + 1,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => {
				setAnswerList([...answerList, res.data]);
			});
	};

	// 답변 수정
	const updateAnswerHandler = (data) => {
		axios
			.put(
				`http://localhost:3001/answers${data.id}`,
				{ ...data },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) =>
				setAnswerList(
					answerList.map((it) => (it.answer_id === data.answer_id ? data : it)),
				),
			);
	};

	// 답변 삭제
	const deleteAnswerHandler = (data) => {
		axios
			.delete(`http://localhost:3001/answers/${data.id}`)
			.then((res) =>
				setAnswerList(
					answerList.filter((it) => it.answer_id !== data.answer_id),
				),
			);
	};

	return (
		questionData && (
			<QuestionContainer>
				<LoginHeader />

				<main>
					<TitleContainer>
						<div className="top__container">
							<span>{questionData.title}</span>

							<Link to="/myprofile">
								<button type="button">Ask Questions</button>
							</Link>
						</div>
						<div className="bottom__container">
							<div className="info__container">
								<InfoBox>
									<span className="first__span">Asked</span>
									<span className="second__span">
										{questionData.created_at}
									</span>
								</InfoBox>
								<InfoBox>
									<span className="first__span">Modified</span>
									<span className="second__span">
										{questionData.modified_at}
									</span>
								</InfoBox>
								<InfoBox>
									<span className="first__span">Viewed</span>
									<span className="second__span">8times</span>
								</InfoBox>
							</div>
						</div>
					</TitleContainer>

					<QnABox
						questionData={questionData}
						deleteQuestionHandler={deleteQuestionHandler}
						deleteAnswerHandler={deleteAnswerHandler}
						mode="question"
					/>

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
									// key={it.answer_id}
									questionData={it}
									deleteQuestionHandler={deleteQuestionHandler}
									deleteAnswerHandler={deleteAnswerHandler}
									mode="answer"
								/>
							))}
						</div>
					</AnswersContainer>
					<AnswerForm createAnswerHandler={createAnswerHandler} />
				</main>
			</QuestionContainer>
		)
	);
}

export default Question;
