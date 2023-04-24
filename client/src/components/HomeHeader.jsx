import styled from 'styled-components';
import { Link } from 'react-router-dom';

function HomeHeader() {
	return (
		<HomeHeaderContainer>
			<h2 className="all">All Questions</h2>
			<button className="ask-question" type="button">
				<AskLink to="/askquestion">Ask Questions</AskLink>
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
		width: 11%;
		height: 3em;
		font-size: var(--font-large);
		border-radius: 5px;
		padding: 0;
		cursor: pointer;
		&:hover {
			background-color: var(--button-hover-color);
		}
	}
`;
const AskLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 1% 6%;
`;
