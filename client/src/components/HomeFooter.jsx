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
	position: relative;
	align-items: center;
	width: 80%;
	height: 100px;
	border-top: 1px solid var(--line-color);
	background-color: white;
`;
