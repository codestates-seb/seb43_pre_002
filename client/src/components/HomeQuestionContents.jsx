import { Link } from 'react-router-dom';
import styled from 'styled-components';

function HomeQuestionContents({ data }) {
	// html에서 텍스트 추출
	const previewBody = data.content.replace(/(<([^>]+)>)/gi, '').trim();
	return (
		<QuestionContentsContainer>
			<Link to={`/question/${data.questionId}`} className="question-header">
				<span>{data.title}</span>
			</Link>
			<p className="question-body">{previewBody}</p>
		</QuestionContentsContainer>
	);
}

export default HomeQuestionContents;

const QuestionContentsContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 80%;
	width: 80%;
	padding: 0 2%;
	.question-header {
		margin: 1.5% 0 2% 0;
		font-size: var(--font-title-small);
		font-weight: 700;
		color: var(--button-hover-color);
		&:hover {
			color: var(--main-color);
		}
	}
	.question-body {
		margin: 0;
		width: 80%;
		height: calc(var(--font-base) * 2.95);
		font-size: var(--font-base);
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		word-break: break-all;
	}
`;
