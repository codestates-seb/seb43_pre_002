import styled from 'styled-components';
import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import QuestionItem from '../components/QuestionItem';
import HomeFooter from '../components/HomeFooter';

function Home() {
	const mapArr = [1, 2, 3, 4, 5, 6];
	return (
		<HomeContainer>
			<HomeHeader />
			<HomeFilter />
			{mapArr.map((el) => (
				<QuestionItem key={el} />
			))}
			<HomeFooter />
		</HomeContainer>
	);
}
export default Home;

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	width: 80vw;
`;
