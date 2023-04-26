import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import DividerLine from '../components/DividerLine';

import { dateFormat } from '../utils/dateFormat';

const TimelineContainer = styled.div`
	display: flex;
	flex-direction: column;

	/* border: black solid 1px; */
	position: absolute;
	top: 50px;
	align-items: center;
	width: 100vw;

	main {
		padding: 24px;
		display: flex;
		flex-direction: column;
		/* border: black solid 1px; */
		flex: 1;
		width: 90vw;
	}

	.sub__header {
		span {
			color: var(--main-color);
		}
		margin-bottom: 16px;
		h1 {
			font-size: var(--font-title-small);

			margin-bottom: 5px;
		}
		h2 {
			font-size: var(--font-large);
		}
	}

	.select__filter {
		margin-bottom: 16px;
		> span {
			font-weight: bold;
		}
		.select__box {
			display: flex;
			margin-top: 16px;
			> div {
				width: 150px;
				padding: 10px;
				text-align: center;
				border: var(--line-color) solid 0.1px;
				font-size: var(--font-base);
			}
		}
	}

	.table__container {
		> div {
			font-weight: bold;
			margin-bottom: 16px;
		}
		table {
			font-size: var(--font-base);
			width: 100%;
		}
		thead {
			background-color: var(--base-color);
		}
		th {
			font-weight: bold;
			text-align: left;
			height: 34px;
			padding-top: 8px;
			padding-bottom: 10px;
			padding-left: 5px;
			padding-right: 20px;
			> span {
				color: var(--main-color);
			}
		}
		td {
			padding-left: 5px;
			padding-top: 8px;
			padding-bottom: 8px;
			padding-right: 20px;
		}
		.toggle__format {
			text-align: right;
		}
	}
`;

function Timeline() {
	const navigate = useNavigate();
	const { question_id: questionId, answer_id: answerId } = useParams();

	const [question, setQuestion] = useState();
	const [answer, setAnswer] = useState();

	const removeHTMLTag = (data) => {
		// 정규식
		const reg = /<[^>]*>?/g;
		if (data === undefined) {
			return data;
		}

		return data.replace(reg, '');
	};

	// 질문 조회
	useEffect(() => {
		axios
			.get(`/questions/${questionId}`, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then((res) => {
				const que = res.data;
				console.log(que);
				setQuestion(que);
			})
			.catch((err) => navigate('/'));
	}, []);

	// 답변 조회
	useEffect(() => {
		if (Number(answerId) > 0) {
			axios
				.get(`/answers/${answerId}`, {
					headers: {
						'Content-Type': `application/json`,
					},
				})
				.then((res) => {
					const ans = res.data;
					if (ans) {
						setAnswer(ans);
						console.log(ans);
					} else {
						navigate('/');
					}
				})
				.catch((err) => navigate('/'));
		}
	}, []);

	return (
		<TimelineContainer>
			{question && (
				<main>
					<div className="sub__header">
						<h1>
							Timeline for
							<span> </span>
							<Link to={`/question/${questionId}`}>
								<span>{question.questionTitle}</span>
							</Link>
						</h1>
						<h3>
							Current License: <span>CC BY-SA 4.0</span>
						</h3>
						<DividerLine />
					</div>
					{/* 
					<div className="select__filter">
						<span>Event filters</span>
						<div className="select__box">
							<div>Hide vote summaires</div>
							<div>Show vote summaries</div>
						</div>
					</div> */}

					<div className="table__container">
						<div>2 event</div>

						<table>
							<thead>
								<tr>
									<th>
										when <span>toggle format</span>
									</th>
									<th> what</th>
									<th> </th>
									<th>by</th>

									<th> license</th>
									<th>comment</th>
								</tr>
							</thead>
							<tbody>
								{Number(answerId) > 0 ? (
									// 답변결과
									answer && (
										<>
											<tr>
												<td className="toggle__format">
													{dateFormat(new Date(answer.modifiedAt))}
												</td>
												<td>history</td>
												<td>edited</td>
												<td>{answer.memberId}</td>
												<td>CC BY-SA 4.0</td>
												<td>{removeHTMLTag(answer.content)}</td>
											</tr>
											<tr>
												<td className="toggle__format">
													{dateFormat(new Date(answer.createdAt))}
												</td>
												<td>history</td>
												<td>added</td>
												<td>{answer.memberId}</td>
												<td>CC BY-SA 4.0</td>
												<td />
											</tr>
										</>
									)
								) : (
									// 질문 결과
									<>
										<tr>
											<td className="toggle__format">
												{dateFormat(new Date(question.questionModifiedAt))}
											</td>
											<td>history</td>
											<td>edited</td>
											<td>{question.memberId}</td>
											<td>CC BY-SA 4.0</td>
											<td>{removeHTMLTag(question.questionContent)}</td>
										</tr>
										<tr>
											<td className="toggle__format">
												{dateFormat(new Date(question.questionCreatedAt))}
											</td>
											<td>history</td>
											<td>added</td>
											<td>{question.memberId}</td>
											<td>CC BY-SA 4.0</td>
											<td />
										</tr>
									</>
								)}
							</tbody>
						</table>
					</div>
				</main>
			)}
		</TimelineContainer>
	);
}
export default Timeline;
