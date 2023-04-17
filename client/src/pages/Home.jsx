import styled from 'styled-components';
import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import QuestionItem from '../components/QuestionItem';
import HomeFooter from '../components/HomeFooter';

function Home() {
	return (
		<HomeContainer>
			<HomeHeader />
			<HomeFilter />
			<QuestionItem />
			<QuestionItem />
			<QuestionItem />
			<QuestionItem />
			<QuestionItem />
			<QuestionItem />
			<HomeFooter />
		</HomeContainer>
	);
}
export default Home;

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: skyblue;
	width: 80vw;
`;
