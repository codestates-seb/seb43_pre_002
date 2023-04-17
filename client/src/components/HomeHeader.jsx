import styled from 'styled-components';

function HomeHeader() {
	return (
		<HomeHeaderContainer>
			<h2>All Questions</h2>
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
	background-color: orange;
	.ask-question {
		color: white;
		background-color: #0995fe;
		width: 10%;
		height: 3em;
	}
`;
