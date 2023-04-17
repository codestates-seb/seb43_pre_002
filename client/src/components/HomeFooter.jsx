import styled from 'styled-components';
import Pagination from './Pagination';
import QuestionsPerPage from './QuestionsPerPage';

function HomeFooter() {
	return (
		<HomeFooterContainer>
			<Pagination />
			<QuestionsPerPage />
		</HomeFooterContainer>
	);
}

export default HomeFooter;

const HomeFooterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100px;
`;
