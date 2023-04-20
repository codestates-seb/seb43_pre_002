import styled from 'styled-components';

function HomeHeader() {
	return (
		<HomeHeaderContainer>
			<h2 className="all">All Questions</h2>
			<button className="ask-question" type="button">
				Ask Questions
			</button>
		</HomeHeaderContainer>
	);
}
export default HomeHeader;

const HomeHeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 50px;
	background-color: white;
	padding: 0 10%;
	margin: 1% 0;
	.all {
		font-size: var(--font-title-large);
	}
	.ask-question {
		color: white;
		background-color: var(--main-color);
		width: 10%;
		height: 3em;
		font-size: var(--font-large);
		border-radius: 5px;
		cursor: pointer;
		&:hover {
			background-color: #3b6fa0; // 나중에 global 변수로 변경하기
		}
	}
`;
