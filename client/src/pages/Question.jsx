import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoginHeader from '../components/Header/LoginHeader';
import QnABox from '../components/QnABox';
import AnswerForm from '../components/AnswerForm';
import { newestAnswer, oldestAnswer } from '../utils/filterFunction';
import { timeForToday } from '../utils/dateFormat';

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
			cursor: pointer;
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
	const [sortType, setSortType] = useState('oldest');
	const [render, setRender] = useState(false);

	const [userId, setUserId] = useState(
		localStorage.getItem('loginMemberId')
			? JSON.parse(localStorage.getItem('loginMemberId'))
			: null,
	);

	// 로그인 상태 받기
	const { isLogin } = useSelector((state) => state.login);

	// 정렬 리스트
	const sortOptionList = [
		{ value: 'oldest', name: 'oldest first' },
		{ value: 'newest', name: 'newest first' },
	];

	// 정렬 기능
	const sortAnswerList = () => {
		if (sortType === 'oldest') {
			return oldestAnswer(answerList);
		}
		if (sortType === 'newest') {
			return newestAnswer(answerList);
		}
		return answerList;
	};

	const navigate = useNavigate();

	// 질문 조회 및 답변 조회
	useEffect(() => {
		console.log(userId);
		axios
			.get(`/questions/${targetId}`, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {
				const question = res.data;
				// console.log(question);
				setQuestionData(question);
				setAnswerList(question.answers);
			})
			.catch((res) => {
				console.log('에러발생');
				navigate('/');
			});
	}, [render]);

	// 질문 삭제
	const deleteQuestionHandler = (data) => {
		axios
			.delete(`/questions/${targetId}`)
			.then((res) => {
				setQuestionData({});
				navigate('/');
			})
			.catch((res) => {
				console.log(res);
				navigate('/');
			});
	};

	// 답변 생성
	const createAnswerHandler = (data) => {
		axios
			.post(`/questions/${targetId}/answers`, JSON.stringify({ ...data }), {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {
				setRender(!render);
				// navigate(0);
			})
			.catch((res) => console.log(res));
	};

	// 답변 삭제
	const deleteAnswerHandler = (data) => {
		axios
			.delete(`/answers/${data.answerId}`)
			.then((res) =>
				setAnswerList(answerList.filter((it) => it.answerId !== data.answerId)),
			)
			.catch((res) => console.log(res));
	};

	return (
		questionData && (
			<QuestionContainer>
				<main>
					<TitleContainer>
						<div className="top__container">
							<span>{questionData.questionTitle}</span>

							<Link to="/askquestion">
								<button type="button">Ask Questions</button>
							</Link>
						</div>
						<div className="bottom__container">
							<div className="info__container">
								<InfoBox>
									<span className="first__span">Asked</span>
									<span className="second__span">
										{timeForToday(questionData.questionCreatedAt)}
									</span>
								</InfoBox>
								<InfoBox>
									<span className="first__span">Modified</span>
									<span className="second__span">
										{timeForToday(questionData.questionModifiedAt)}
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

					<AnswersContainer>
						<div className="answers__header">
							<span>{`${answerList.length} Answers`}</span>
							<div className="filter__container">
								<span>Sorted by:</span>
								<select onChange={(e) => setSortType(e.target.value)}>
									{sortOptionList.map((it) => (
										<option key={it.value} value={it.value}>
											{it.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div>
							{sortAnswerList().map((it) => {
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
		)
	);
}

export default Question;
