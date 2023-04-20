import styled from 'styled-components';
import Pagination from './HomePagination';
import QuestionsPerPage from './HomeQuestionsPerPage';

function HomeFooter({
	data,
	currentPage,
	setCurrentPage,
	limitItems,
	setLimitItems,
}) {
	return (
		<HomeFooterContainer>
			<Pagination
				data={data}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				limitItems={limitItems}
			/>
			<QuestionsPerPage limitItems={limitItems} setLimitItems={setLimitItems} />
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
