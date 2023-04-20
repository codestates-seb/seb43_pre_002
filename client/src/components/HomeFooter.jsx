import styled from 'styled-components';
import HomePagination from './HomePagination';
import QuestionsPerPage from './HomeQuestionsPerPage';

function HomeFooter({
	totalDataCount,
	currentPage,
	setCurrentPage,
	limitItems,
	setLimitItems,
}) {
	return (
		<HomeFooterContainer>
			<HomePagination
				totalDataCount={totalDataCount}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				limitItems={limitItems}
			/>
			<QuestionsPerPage
				limitItems={limitItems}
				setLimitItems={setLimitItems}
				setCurrentPage={setCurrentPage}
			/>
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
